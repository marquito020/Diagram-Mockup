import { useState, useEffect, useCallback } from "react";
import {
  // File Manager
  loadFilesFromLocalStorage,
  saveToLocalStorage,
  updateAvailableFilesList,
  renameFile,
  deleteFile,

  // Diagram Processor
  // extractClassesFromXmlProcessor,
  // processXmlContent,

  // Diagram Events
  handleDiagramAutoSave,
  // extractXmlFromSaveEvent,

  // Diagram File Handlers
  extractClasses,
  importFile,
  saveAsConfirm,
  selectFile,

  // Component Utils
  createBlankDiagram,
  toggleFileSelector,
  loadDiagram,
} from "../utils";
import { ClassInfo } from "../types/diagram";
import { downloadFile, listAssetsFiles } from "../services/fileService";
import { DrawIoEmbedRef } from "react-drawio";

// Define the DrawioAutoSaveEvent interface
interface DrawioAutoSaveEvent {
  event: "autosave";
  xml: string;
  data?: string | Record<string, unknown>;
}

export function useDiagramManager(
  drawioRef?: React.RefObject<DrawIoEmbedRef | null>
) {
  // State variables
  const [xmlContent, setXmlContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [showClasses, setShowClasses] = useState(false);
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingMockup, setLoadingMockup] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [showMockupSaveDialog, setShowMockupSaveDialog] = useState(false);
  const [mockupFileName, setMockupFileName] = useState("mockup");
  const [mockupXmlContent, setMockupXmlContent] = useState<string | null>(null);
  const [availableFiles, setAvailableFiles] = useState<
    { path: string; name: string }[]
  >([]);
  const [showFileSelector, setShowFileSelector] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<string>("");
  const [showDiagramManager, setShowDiagramManager] = useState(false);
  const [showImageConverter, setShowImageConverter] = useState(false);

  // Load the list of saved diagrams
  useEffect(() => {
    const filesList = updateAvailableFilesList();
    setAvailableFiles(filesList);
  }, []);

  // Load file list on component mount
  useEffect(() => {
    const savedFiles = loadFilesFromLocalStorage();
    setFiles(savedFiles);

    // Load the last opened file if available
    const lastOpenedFile = localStorage.getItem("lastOpenedFile");
    if (lastOpenedFile && savedFiles.includes(lastOpenedFile)) {
      loadFile(lastOpenedFile);
    }
  }, []);

  // Save to localStorage whenever xmlContent changes and we have a filename
  useEffect(() => {
    if (xmlContent && fileName) {
      console.log(`Saving ${fileName} after content change...`);
      saveToLocalStorage(fileName, xmlContent);
    }
  }, [xmlContent, fileName]);

  // Function to update available files list
  const refreshAvailableFiles = useCallback(() => {
    const filesList = updateAvailableFilesList();
    setAvailableFiles(filesList);

    // Update files state
    const fileNames = filesList.map((file) => file.name);
    setFiles(fileNames);
  }, []);

  // Function to create a new blank diagram
  const handleCreateNewDiagram = () => {
    createBlankDiagram(
      setXmlContent,
      setClasses,
      setShowClasses,
      setCurrentFile,
      setFileName,
      setError,
      setShowSaveDialog
    );
  };

  // Show file selector
  const handleToggleFileSelector = () => {
    toggleFileSelector(
      showFileSelector,
      setShowFileSelector,
      refreshAvailableFiles,
      listAssetsFiles,
      availableFiles,
      setAvailableFiles
    );
  };

  // Function to handle file selection from the selector
  const handleFileSelect = async (path: string) => {
    return selectFile(
      path,
      setError,
      setLoadingExtract,
      setShowClasses,
      setXmlContent,
      setClasses,
      setFileName,
      setCurrentFile,
      setShowFileSelector
    );
  };

  // Handler for the class extraction button
  const handleExtractClasses = () => {
    if (xmlContent) {
      extractClasses(
        xmlContent,
        setError,
        setLoadingExtract,
        setClasses,
        setShowClasses
      );
    } else {
      console.error("No hay contenido XML para procesar");
      setError("No hay contenido XML para procesar");
    }
  };

  // Function to import a file from the user's local system
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    importFile(
      file,
      setError,
      setXmlContent,
      setFileName,
      setCurrentFile,
      refreshAvailableFiles
    );

    // Clear the input to allow selecting the same file again
    event.target.value = "";
  };

  // Handle save dialog confirmation
  const handleSaveAsConfirm = async () => {
    saveAsConfirm(
      newFileName,
      xmlContent,
      files,
      setError,
      setLoadingSave,
      setFiles,
      setFileName,
      setCurrentFile,
      setXmlContent,
      refreshAvailableFiles,
      setShowSaveDialog,
      setNewFileName
    );
  };

  // Download the current diagram as a file
  const handleDownload = () => {
    if (!xmlContent) return;
    downloadFile(fileName, xmlContent);
  };

  // Function to load a file
  const loadFile = (fileName: string) => {
    loadDiagram(fileName, setXmlContent, setCurrentFile, setError);
  };

  // Handler for onAutoSave event
  const handleAutoSave = (data: DrawioAutoSaveEvent) => {
    handleDiagramAutoSave(
      data,
      fileName,
      files,
      setFiles,
      refreshAvailableFiles,
      setXmlContent
    );
  };

  // Handler for exporting XML from drawio
  const handleExportXml = useCallback(() => {
    console.log("Manually triggering PNG export from diagram");
    if (drawioRef?.current) {
      // Export as PNG but don't save the content to the current diagram
      const originalXmlContent = xmlContent;

      // Use exportDiagram which will trigger the onExport handler
      drawioRef.current.exportDiagram({
        format: "png",
      });

      // Make sure we preserve the original XML content (will run after the export callback)
      setTimeout(() => {
        if (originalXmlContent !== xmlContent) {
          console.log("Restoring original XML content after export");
          setXmlContent(originalXmlContent);
        }
      }, 100);
    } else {
      setError(
        "No se puede exportar el diagrama: el editor no está inicializado"
      );
    }
  }, [drawioRef, xmlContent]);

  // Handler for the mockup conversion button
  const handleConvertToMockup = () => {
    if (xmlContent) {
      try {
        setLoadingMockup(true);

        // Import the processXmlContent function directly from diagramProcessor
        import("../utils/diagramProcessor").then(({ processXmlContent }) => {
          // Extract classes from the XML
          const extractedClasses = processXmlContent(xmlContent);

          // Import the converter and generate mockup
          import("../utils/mockupConverter").then(({ convertToMockup }) => {
            // Convert to mockup
            const mockupXml = convertToMockup(xmlContent, extractedClasses);

            // Store the mockup XML for saving
            setMockupXmlContent(mockupXml);

            // Set a default name based on original file
            const baseName = fileName.replace(/\.drawio\.xml$/, "");
            setMockupFileName(`mockup_${baseName || "nuevo"}`);

            // Show the save dialog
            setShowMockupSaveDialog(true);
            setLoadingMockup(false);
          });
        });
      } catch (error) {
        console.error("Error preparing mockup conversion:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to prepare mockup conversion"
        );
        setLoadingMockup(false);
      }
    } else {
      console.error("No hay contenido XML para procesar");
      setError("No hay contenido XML para procesar");
    }
  };

  // Handle mockup save dialog confirmation
  const handleMockupSaveConfirm = async () => {
    if (!mockupXmlContent) {
      setError("No hay contenido de mockup para guardar");
      return;
    }

    setLoadingSave(true);

    try {
      // Ensure the filename has the correct extension
      let filename = mockupFileName;
      if (!filename.endsWith(".drawio.xml")) {
        filename = filename.endsWith(".xml")
          ? filename.replace(".xml", ".drawio.xml")
          : `${filename}.drawio.xml`;
      }

      // Save mockup to localStorage
      const saveResult = saveToLocalStorage(filename, mockupXmlContent);

      if (saveResult) {
        // Update UI with new mockup diagram
        setXmlContent(mockupXmlContent);
        setFileName(filename);
        setCurrentFile(filename);

        // Add to files list if not already there
        if (!files.includes(filename)) {
          const updatedFiles = [...files, filename];
          setFiles(updatedFiles);
        }

        // Update file list
        refreshAvailableFiles();

        // Close dialog
        setShowMockupSaveDialog(false);
        setMockupFileName("mockup");
        setMockupXmlContent(null);
      } else {
        setError("Error al guardar el mockup");
      }
    } catch (error) {
      console.error("Error saving mockup:", error);
      setError(
        error instanceof Error ? error.message : "Failed to save mockup"
      );
    } finally {
      setLoadingSave(false);
    }
  };

  // Toggle diagram manager
  const handleToggleDiagramManager = () => {
    setShowDiagramManager(!showDiagramManager);

    // Refresh file list when opening
    if (!showDiagramManager) {
      refreshAvailableFiles();
    }
  };

  // Rename a diagram file
  const handleRenameDiagram = async (
    oldName: string,
    newName: string
  ): Promise<boolean> => {
    try {
      if (oldName === newName) {
        return true; // No change needed
      }

      // Check if new name already exists
      if (files.includes(newName)) {
        setError(`Ya existe un diagrama con el nombre "${newName}"`);
        return false;
      }

      const success = renameFile(oldName, newName);

      if (success) {
        // Update current file name if it's the one being renamed
        if (currentFile === oldName) {
          setFileName(newName);
          setCurrentFile(newName);
        }

        // Update files list
        const updatedFiles = files.map((f) => (f === oldName ? newName : f));
        setFiles(updatedFiles);
        refreshAvailableFiles();
      }

      return success;
    } catch (error) {
      console.error("Error renaming diagram:", error);
      setError("Error al renombrar el diagrama");
      return false;
    }
  };

  // Delete a diagram file
  const handleDeleteDiagram = async (fileName: string): Promise<boolean> => {
    try {
      const success = deleteFile(fileName);

      if (success) {
        // If the current file is being deleted, clear the current state
        if (currentFile === fileName) {
          setXmlContent(null);
          setFileName("");
          setCurrentFile("");
          setClasses([]);
        }

        // Update files list
        const updatedFiles = files.filter((f) => f !== fileName);
        setFiles(updatedFiles);
        refreshAvailableFiles();
      }

      return success;
    } catch (error) {
      console.error("Error deleting diagram:", error);
      setError("Error al eliminar el diagrama");
      return false;
    }
  };

  // Toggle image mockup converter
  const handleToggleImageConverter = () => {
    setShowImageConverter(!showImageConverter);
  };

  // Handle mockup generated from image
  const handleImageMockupGenerated = (xmlContent: string) => {
    try {
      // Generate a filename based on timestamp
      const timestamp = new Date().getTime();
      const filename = `image_mockup_${timestamp}.drawio.xml`;

      // Save to localStorage
      const saveResult = saveToLocalStorage(filename, xmlContent);

      if (saveResult) {
        // Update UI with new mockup
        setXmlContent(xmlContent);
        setFileName(filename);
        setCurrentFile(filename);

        // Add to files list if not already there
        if (!files.includes(filename)) {
          const updatedFiles = [...files, filename];
          setFiles(updatedFiles);
        }

        // Update file list
        refreshAvailableFiles();

        // Close dialog
        setShowImageConverter(false);
      } else {
        setError("Error al guardar el mockup generado desde imagen");
      }
    } catch (error) {
      console.error("Error saving image mockup:", error);
      setError(
        error instanceof Error ? error.message : "Failed to save image mockup"
      );
    }
  };

  return {
    // State
    xmlContent,
    error,
    classes,
    showClasses,
    loadingExtract,
    loadingMockup,
    loadingSave,
    fileName,
    showSaveDialog,
    newFileName,
    showMockupSaveDialog,
    mockupFileName,
    showDiagramManager,
    showImageConverter,
    availableFiles,
    showFileSelector,
    files,
    currentFile,

    // State setters
    setXmlContent,
    setError,
    setShowClasses,
    setShowSaveDialog,
    setNewFileName,
    setShowMockupSaveDialog,
    setMockupFileName,
    setShowDiagramManager,
    setShowImageConverter,

    // Handlers
    handleCreateNewDiagram,
    handleToggleFileSelector,
    handleToggleDiagramManager,
    handleToggleImageConverter,
    handleImageMockupGenerated,
    handleFileSelect,
    handleExtractClasses,
    handleConvertToMockup,
    handleMockupSaveConfirm,
    handleRenameDiagram,
    handleDeleteDiagram,
    handleFileImport,
    handleSaveAsConfirm,
    handleDownload,
    handleAutoSave,
    handleExportXml,
  };
}
