import { saveFileToAssets } from "../services/fileService";
import { saveToLocalStorage, saveFilesListToLocalStorage } from "./fileManager";

// Define interfaces for event data (duplicated from DiagramEditor.tsx)
interface DrawioEventBase {
  event: string;
  xml?: string;
  data?: string | Record<string, unknown>;
}

interface DrawioSaveEvent extends DrawioEventBase {
  event: 'save';
  xml: string;
}

interface DrawioAutoSaveEvent extends DrawioEventBase {
  event: 'autosave';
  xml: string;
}

type DrawioEvent = DrawioSaveEvent | DrawioAutoSaveEvent;

/**
 * Extracts XML content from SVG data
 * @param svgData Base64 encoded SVG data
 */
export const extractXmlFromSvg = (svgData: string): string | null => {
  try {
    // Decode base64 SVG data
    const base64Data = svgData.replace("data:image/svg+xml;base64,", "");
    const decodedSvg = atob(base64Data);

    // Look for embedded XML within SVG
    const mxGraphModelMatch = decodedSvg.match(
      /<mxGraphModel[^>]*>[\s\S]*?<\/mxGraphModel>/
    );
    if (mxGraphModelMatch) {
      console.log("Found mxGraphModel content within SVG");
      return `<mxfile>${mxGraphModelMatch[0]}</mxfile>`;
    }

    // Check for mxfile content
    const mxFileMatch = decodedSvg.match(/<mxfile[^>]*>[\s\S]*?<\/mxfile>/);
    if (mxFileMatch) {
      console.log("Found mxfile content within SVG");
      return mxFileMatch[0];
    }

    return null;
  } catch (error) {
    console.error("Error extracting XML from SVG:", error);
    return null;
  }
};

/**
 * Handle auto-save events from DrawIO
 */
export const handleDiagramAutoSave = async (
  data: DrawioAutoSaveEvent,
  fileName: string,
  files: string[],
  updateFiles: (files: string[]) => void,
  updateFileList: () => void,
  setXmlContent: (xml: string) => void
): Promise<void> => {
  console.log("AutoSave event received:", {
    xmlLength: data.xml?.length || 0,
    xmlSample: data.xml?.substring(0, 100),
  });

  if (data.xml && data.xml.length > 0) {
    // Update the application state with the new XML content
    setXmlContent(data.xml);

    // Save to localStorage if we have a filename
    if (fileName) {
      saveToLocalStorage(fileName, data.xml);
      console.log(`AutoSave: XML saved to localStorage: drawio_${fileName}`);

      // Add to files list if not already there
      if (!files.includes(fileName)) {
        const updatedFiles = [...files, fileName];
        updateFiles(updatedFiles);
        saveFilesListToLocalStorage(updatedFiles);
      }

      // Save to assets for persistence
      saveFileToAssets(fileName, data.xml).then((result) => {
        if (result.success) {
          console.log(`AutoSave: XML guardado en assets: ${result.path}`);
        } else {
          console.error(`AutoSave: No se pudo guardar en assets`);
        }
      });

      // Update file list
      updateFileList();
    }
  }
};

/**
 * Extract XML content from save event
 */
export const extractXmlFromSaveEvent = (event: DrawioEvent): string | null => {
  console.log("Extracting XML content from save event", {
    eventType: event.event,
    hasXml: !!event.xml,
    xmlLength: event.xml?.length || 0,
    xmlStart: event.xml?.substring(0, 100),
    xmlFormat: event.xml?.startsWith("data:image/svg+xml;base64,")
      ? "svg-base64"
      : event.xml?.includes("<mxGraphModel") || event.xml?.includes("<mxfile")
      ? "xml"
      : "unknown",
  });

  // Helper function to validate if content is valid DrawIO XML
  const isValidDrawioXml = (content: string): boolean => {
    if (!content || typeof content !== "string") return false;

    // Check for essential DrawIO XML markers
    const hasMxGraphModel = content.includes("<mxGraphModel");
    const hasMxFile = content.includes("<mxfile");
    // const hasCellElements = content.includes("<mxCell");

    return (hasMxGraphModel || hasMxFile) && content.length > 50;
  };

  // Helper function to ensure XML is properly wrapped in mxfile if needed
  const ensureProperXmlFormat = (content: string): string => {
    if (!content) return content;

    // If it's just an mxGraphModel without mxfile wrapper, add the wrapper
    if (content.includes("<mxGraphModel") && !content.includes("<mxfile")) {
      console.log("Adding mxfile wrapper to mxGraphModel content");
      return `<mxfile modified="${new Date().toISOString()}">${content}</mxfile>`;
    }

    return content;
  };

  try {
    let extractedXml: string | null = null;

    // Case 1: Direct XML content in the event
    if (event.xml) {
      console.log("XML content found directly in event.xml");

      // Check if it's an SVG data URL with base64 encoding
      if (
        typeof event.xml === "string" &&
        event.xml.startsWith("data:image/svg+xml;base64,")
      ) {
        console.log("Processing SVG base64 data from event.xml");
        extractedXml = extractXmlFromSvg(event.xml);
      } else {
        extractedXml = event.xml;
      }

      if (extractedXml && isValidDrawioXml(extractedXml)) {
        console.log("Valid DrawIO XML found in event.xml");
        return ensureProperXmlFormat(extractedXml);
      } else {
        console.log(
          "Content in event.xml doesn't appear to be valid DrawIO XML, continuing search..."
        );
      }
    }

    // Case 2: Check if event.data contains XML
    if (event.data) {
      console.log("Checking event.data for XML content");

      let content: string;
      if (typeof event.data === "string") {
        content = event.data;
      } else if (typeof event.data === "object" && event.data.toString) {
        content = event.data.toString();
      } else {
        console.log(
          "event.data is not a string or cannot be converted to string"
        );
        return extractedXml; // Return whatever we found in step 1, even if invalid
      }

      // Look for mxGraphModel content
      const mxGraphModelMatch = content.match(
        /<mxGraphModel[^>]*>[\s\S]*?<\/mxGraphModel>/
      );
      if (mxGraphModelMatch) {
        console.log("Found mxGraphModel content in event.data");
        extractedXml = `<mxfile modified="${new Date().toISOString()}">${
          mxGraphModelMatch[0]
        }</mxfile>`;

        if (isValidDrawioXml(extractedXml)) {
          console.log("Valid DrawIO XML found in event.data (mxGraphModel)");
          return extractedXml;
        }
      }

      // Look for mxfile content
      const mxFileMatch = content.match(/<mxfile[^>]*>[\s\S]*?<\/mxfile>/);
      if (mxFileMatch) {
        console.log("Found mxfile content in event.data");
        extractedXml = mxFileMatch[0];

        if (isValidDrawioXml(extractedXml)) {
          console.log("Valid DrawIO XML found in event.data (mxfile)");
          return extractedXml;
        }
      }
    }

    // If we've tried all methods but still have XML from first attempt that wasn't validated
    if (extractedXml) {
      console.log("Returning best XML found, though not fully validated");
      return ensureProperXmlFormat(extractedXml);
    }

    console.log("No XML content could be extracted");
    return null;
  } catch (error) {
    console.error("Error extracting XML content:", error);

    // Even if we hit an error, return any XML we might have found
    if (event?.xml && typeof event.xml === "string") {
      console.log("Returning event.xml despite error");
      return event.xml;
    }

    return null;
  }
};
