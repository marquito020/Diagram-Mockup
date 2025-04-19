import { ClassInfo, ClassAttribute } from "../types/diagram";

/**
 * Converts a class diagram to a mockup diagram
 * Each class becomes a page with form fields based on its attributes
 */
export const convertToMockup = (
  xmlContent: string,
  classes: ClassInfo[]
): string => {
  // If we don't have classes yet, extract them from the XML
  if (!classes.length && xmlContent) {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");

      // Create a new diagram from scratch based on the classes we found
      const mockupXml = generateMockupXml(classes);
      return mockupXml;
    } catch (error) {
      console.error("Error converting to mockup:", error);
      throw new Error("Failed to convert diagram to mockup");
    }
  } else {
    // Use the provided classes
    return generateMockupXml(classes);
  }
};

/**
 * Generates mockup XML based on the extracted classes
 */
const generateMockupXml = (classes: ClassInfo[]): string => {
  // Base mockup template
  const baseTemplate = `<mxfile host="embed.diagrams.net" modified="2023-06-12T10:00:00.000Z" agent="Mozilla/5.0" version="26.2.12">
  <diagram id="mockup-diagram" name="Mockup">
    <mxGraphModel dx="962" dy="1606" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        ${generateMockupPages(classes)}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  return baseTemplate;
};

/**
 * Generates mockup pages for each class
 */
const generateMockupPages = (classes: ClassInfo[]): string => {
  if (!classes.length) {
    return "";
  }

  let pages = "";

  // For each class, create a mockup page
  classes.forEach((classInfo, classIndex) => {
    const pageId = `page-${classIndex}`;
    const pageTitle = classInfo.name;

    // Create a browser window container for the mockup
    pages += `
        <!-- Page for ${pageTitle} -->
        <mxCell id="${pageId}-container" value="" style="strokeWidth=1;shadow=0;dashed=0;align=center;shape=mxgraph.mockup.containers.browserWindow;rSize=0;strokeColor=#666666;strokeColor2=#008cff;strokeColor3=#c4c4c4;mainText=,;recursiveResize=0;" vertex="1" parent="1">
          <mxGeometry x="${
            20 + classIndex * 850
          }" y="60" width="800" height="850" as="geometry" />
        </mxCell>
        <mxCell id="${pageId}-title" value="${pageTitle}" style="strokeWidth=1;shadow=0;dashed=0;align=center;shape=mxgraph.mockup.containers.anchor;fontSize=17;fontColor=#666666;align=left;" vertex="1" parent="${pageId}-container">
          <mxGeometry x="60" y="12" width="110" height="26" as="geometry" />
        </mxCell>
        <mxCell id="${pageId}-url" value="https://www.${pageTitle.toLowerCase()}.com" style="strokeWidth=1;shadow=0;dashed=0;align=center;shape=mxgraph.mockup.containers.anchor;rSize=0;fontSize=17;fontColor=#666666;align=left;" vertex="1" parent="${pageId}-container">
          <mxGeometry x="130" y="60" width="250" height="26" as="geometry" />
        </mxCell>
        ${generateFormFields(classInfo, pageId)}
        <!-- Submit button with proper spacing -->
        <mxCell id="${pageId}-button" value="Guardar" style="rounded=1;fillColor=#0057D8;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=0;fontSize=12;sketch=0;" vertex="1" parent="${pageId}-container">
          <mxGeometry x="357" y="${
            190 + classInfo.attributes.length * 70
          }" width="86" height="33" as="geometry" />
        </mxCell>`;
  });

  return pages;
};

/**
 * Generates form fields based on class attributes
 */
const generateFormFields = (classInfo: ClassInfo, pageId: string): string => {
  if (!classInfo.attributes.length) {
    return "";
  }

  let fields = "";

  // For each attribute, create a form field
  classInfo.attributes.forEach((attr, index) => {
    const yPosition = 200 + index * 70;
    const fieldId = `${pageId}-field-${index}`;
    const fieldType = getFieldTypeFromAttribute(attr);

    fields += `
        <!-- Field for ${attr.name} -->
        <mxCell id="${fieldId}" value="${attr.name}" style="shadow=0;dashed=0;shape=mxgraph.bootstrap.rrect;rSize=5;strokeColor=#CED4DA;strokeWidth=1;fillColor=#E9ECEF;fontColor=#505050;align=left;verticalAlign=middle;spacingLeft=10;fontSize=14;" vertex="1" parent="${pageId}-container">
          <mxGeometry x="30" y="${yPosition}" width="740" height="40" as="geometry" />
        </mxCell>`;
  });

  return fields;
};

/**
 * Determines the appropriate form field type based on the attribute
 */
const getFieldTypeFromAttribute = (attr: ClassAttribute): string => {
  const typeLower = attr.type.toLowerCase();

  if (typeLower.includes("date") || typeLower.includes("time")) {
    return "date";
  } else if (
    typeLower.includes("number") ||
    typeLower === "int" ||
    typeLower === "integer" ||
    typeLower === "float" ||
    typeLower === "double"
  ) {
    return "number";
  } else if (typeLower.includes("email")) {
    return "email";
  } else if (typeLower.includes("password")) {
    return "password";
  } else if (typeLower.includes("phone") || typeLower.includes("tel")) {
    return "tel";
  } else if (typeLower.includes("bool")) {
    return "checkbox";
  } else {
    return "text";
  }
};
