import { ClassInfo, ClassAttribute } from "../types/diagram";
import { createEmptyMockup } from "./mockupUtils";

/**
 * Convierte un diagrama de clases a un mockup
 * Cada clase se convierte en una tabla en el mockup
 */
export const convertToMockup = (
  xmlContent: string,
  classes: ClassInfo[]
): string => {
  // Si no tenemos clases, intentamos extraerlas del XML
  if (!classes.length && xmlContent) {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");

      // Crear un nuevo diagrama desde cero basado en las clases encontradas
      const mockupXml = generateMockupXml(classes);
      return mockupXml;
    } catch (error) {
      console.error("Error convirtiendo a mockup:", error);
      throw new Error("Error al convertir diagrama a mockup");
    }
  } else {
    // Usar las clases proporcionadas
    return generateMockupXml(classes);
  }
};

/**
 * Genera el XML del mockup basado en las clases extraídas
 */
const generateMockupXml = (classes: ClassInfo[]): string => {
  if (!classes.length) {
    // Si no hay clases, devolver un mockup vacío usando la función de mockupUtils
    return createEmptyMockup();
  }

  try {
    // Como es difícil manipular directamente el XML/SVG, vamos a hacerlo de otra manera
    // Crearemos un contenido modificado a partir del template
    const baseMockup = createEmptyMockup();
    
    // Eliminar la tabla predeterminada y el título
    let modifiedMockup = baseMockup;
    
    // Buscar y quitar el header-title
    const headerTitleStart = modifiedMockup.indexOf('<mxCell id="header-title"');
    if (headerTitleStart !== -1) {
      const headerTitleEnd = modifiedMockup.indexOf('</mxCell>', headerTitleStart) + 8;
      modifiedMockup = modifiedMockup.substring(0, headerTitleStart) + modifiedMockup.substring(headerTitleEnd);
    }
    
    // Buscar y quitar el create-button
    const createButtonStart = modifiedMockup.indexOf('<mxCell id="create-button"');
    if (createButtonStart !== -1) {
      const createButtonEnd = modifiedMockup.indexOf('</mxCell>', createButtonStart) + 8;
      modifiedMockup = modifiedMockup.substring(0, createButtonStart) + modifiedMockup.substring(createButtonEnd);
    }
    
    // Buscar y quitar la tabla
    const tableStart = modifiedMockup.indexOf('<mxCell id="table"');
    if (tableStart !== -1) {
      const tableEnd = modifiedMockup.indexOf('</mxCell>', tableStart);
      // Encontrar el final real de la tabla, que puede contener muchas celdas anidadas
      let nestedLevel = 1;
      let searchPos = tableEnd + 8; // +8 para saltar el primer </mxCell>
      
      while (nestedLevel > 0 && searchPos < modifiedMockup.length) {
        const nextCloseTag = modifiedMockup.indexOf('</mxCell>', searchPos);
        const nextOpenTag = modifiedMockup.indexOf('<mxCell', searchPos);
        
        if (nextCloseTag === -1) break;
        
        if (nextOpenTag !== -1 && nextOpenTag < nextCloseTag) {
          nestedLevel++;
          searchPos = nextOpenTag + 1;
        } else {
          nestedLevel--;
          searchPos = nextCloseTag + 8;
        }
      }
      
      modifiedMockup = modifiedMockup.substring(0, tableStart) + modifiedMockup.substring(searchPos);
    }
    
    // Buscar y quitar el botón save-button
    const saveButtonStart = modifiedMockup.indexOf('<mxCell id="save-button"');
    if (saveButtonStart !== -1) {
      const saveButtonEnd = modifiedMockup.indexOf('</mxCell>', saveButtonStart) + 8;
      modifiedMockup = modifiedMockup.substring(0, saveButtonStart) + modifiedMockup.substring(saveButtonEnd);
    }
    
    // Encontrar dónde termina el root para insertar nuestras tablas antes
    const rootEndIndex = modifiedMockup.lastIndexOf('</root>');
    
    if (rootEndIndex === -1) {
      console.error("No se encontró la etiqueta de cierre </root>");
      return baseMockup;
    }
    
    // Crear el contenido HTML de todas las tablas
    let allTablesHtml = '';
    
    classes.forEach((classInfo, index) => {
      allTablesHtml += createTableForClass(classInfo, index);
    });
    
    // Insertar las tablas en el XML base modificado
    modifiedMockup = 
      modifiedMockup.substring(0, rootEndIndex) + 
      allTablesHtml + 
      modifiedMockup.substring(rootEndIndex);
    
    return modifiedMockup;
  } catch (error) {
    console.error("Error generando el XML del mockup:", error);
    // En caso de error, devolver el template base sin modificaciones
    return createEmptyMockup();
  }
};

/**
 * Crea una tabla para una clase específica
 */
const createTableForClass = (classInfo: ClassInfo, index: number): string => {
  const yOffset = index * 350 + 150; // Espaciado vertical entre tablas
  
  // Crear encabezado de tabla con el nombre de la clase
  let tableHtml = `
    <!-- Tabla para la clase ${classInfo.name} -->
    <mxCell id="class-${index}-title" value="${classInfo.name}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontStyle=1" vertex="1" parent="page-container">
      <mxGeometry x="150" y="${yOffset-50}" width="497" height="30" as="geometry" />
    </mxCell>
    
    <!-- Botón Crear -->
    <mxCell id="class-${index}-create-button" value="+ Crear" style="rounded=1;fillColor=#4CAF50;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=0;fontSize=12;" vertex="1" parent="page-container">
      <mxGeometry x="40" y="${yOffset-40}" width="80" height="30" as="geometry" />
    </mxCell>
    
    <!-- Tabla de atributos con columnas siendo los atributos -->
    <mxCell id="class-${index}-table" value="" style="shape=table;html=1;whiteSpace=wrap;startSize=0;container=1;collapsible=0;childLayout=tableLayout;" vertex="1" parent="page-container">
      <mxGeometry x="40" y="${yOffset}" width="730" height="120" as="geometry" />
    </mxCell>
    
    <!-- Fila de cabecera con los nombres de los atributos -->
    <mxCell id="class-${index}-header" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=#dae8fc;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=#6c8ebf;" vertex="1" parent="class-${index}-table">
      <mxGeometry width="730" height="40" as="geometry" />
    </mxCell>
    
    <!-- ID siempre es la primera columna -->
    <mxCell id="class-${index}-header-id" value="ID" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#dae8fc;top=0;left=0;bottom=0;right=0;pointerEvents=1;strokeColor=#6c8ebf;fontStyle=1;" vertex="1" parent="class-${index}-header">
      <mxGeometry width="60" height="40" as="geometry">
        <mxRectangle width="60" height="40" as="alternateBounds" />
      </mxGeometry>
    </mxCell>`;
    
  // Crear una columna para cada atributo en la fila del encabezado
  classInfo.attributes.forEach((attr, attrIndex) => {
    const colWidth = Math.floor(570 / classInfo.attributes.length); // Distribuir el ancho disponible
    
    tableHtml += `
    <mxCell id="class-${index}-header-attr-${attrIndex}" value="${attr.name}" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#dae8fc;top=0;left=0;bottom=0;right=0;pointerEvents=1;strokeColor=#6c8ebf;fontStyle=1;" vertex="1" parent="class-${index}-header">
      <mxGeometry x="${60 + attrIndex * colWidth}" width="${colWidth}" height="40" as="geometry">
        <mxRectangle width="${colWidth}" height="40" as="alternateBounds" />
      </mxGeometry>
    </mxCell>`;
  });
  
  // Añadir columna de acciones al final del encabezado
  tableHtml += `
    <mxCell id="class-${index}-header-actions" value="Acciones" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#dae8fc;top=0;left=0;bottom=0;right=0;pointerEvents=1;strokeColor=#6c8ebf;fontStyle=1;" vertex="1" parent="class-${index}-header">
      <mxGeometry x="${60 + classInfo.attributes.length * Math.floor(570 / classInfo.attributes.length)}" width="100" height="40" as="geometry">
        <mxRectangle width="100" height="40" as="alternateBounds" />
      </mxGeometry>
    </mxCell>`;
  
  // Agregar filas con datos de ejemplo (2 filas)
  for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
    const rowBg = rowIndex % 2 === 0 ? 'fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;' : 'fillColor=none;';
    
    tableHtml += `
    <!-- Fila de datos ${rowIndex + 1} -->
    <mxCell id="class-${index}-row-${rowIndex}" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;${rowBg}points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="class-${index}-table">
      <mxGeometry y="${40 + rowIndex * 40}" width="730" height="40" as="geometry" />
    </mxCell>
    
    <!-- Celda ID -->
    <mxCell id="class-${index}-cell-${rowIndex}-id" value="${rowIndex + 1}" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;${rowBg}top=0;left=0;bottom=0;right=0;pointerEvents=1;align=center;" vertex="1" parent="class-${index}-row-${rowIndex}">
      <mxGeometry width="60" height="40" as="geometry">
        <mxRectangle width="60" height="40" as="alternateBounds" />
      </mxGeometry>
    </mxCell>`;
    
    // Celdas para cada atributo
    classInfo.attributes.forEach((attr, attrIndex) => {
      const colWidth = Math.floor(570 / classInfo.attributes.length);
      // Generar datos de ejemplo según el tipo de atributo
      let exampleValue = "";
      const attrType = attr.type.toLowerCase();
      
      if (attrType.includes("string") || attrType.includes("text")) {
        exampleValue = "Texto ejemplo";
      } else if (attrType.includes("int") || attrType.includes("number")) {
        exampleValue = `${rowIndex * 10 + 5}`;
      } else if (attrType.includes("date")) {
        exampleValue = "2024-01-01";
      } else if (attrType.includes("bool")) {
        exampleValue = rowIndex === 0 ? "Sí" : "No";
      } else {
        exampleValue = "Valor";
      }
      
      tableHtml += `
      <mxCell id="class-${index}-cell-${rowIndex}-attr-${attrIndex}" value="${exampleValue}" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;${rowBg}top=0;left=0;bottom=0;right=0;pointerEvents=1;align=center;" vertex="1" parent="class-${index}-row-${rowIndex}">
        <mxGeometry x="${60 + attrIndex * colWidth}" width="${colWidth}" height="40" as="geometry">
          <mxRectangle width="${colWidth}" height="40" as="alternateBounds" />
        </mxGeometry>
      </mxCell>`;
    });
    
    // Celda de acciones
    tableHtml += `
    <mxCell id="class-${index}-cell-${rowIndex}-actions" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;${rowBg}top=0;left=0;bottom=0;right=0;pointerEvents=1;" vertex="1" parent="class-${index}-row-${rowIndex}">
      <mxGeometry x="${60 + classInfo.attributes.length * Math.floor(570 / classInfo.attributes.length)}" width="100" height="40" as="geometry">
        <mxRectangle width="100" height="40" as="alternateBounds" />
      </mxGeometry>
    </mxCell>
    
    <mxCell id="class-${index}-btn-edit-${rowIndex}" value="Editar" style="rounded=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;align=center;verticalAlign=middle;fontStyle=0;fontSize=10;" vertex="1" parent="class-${index}-cell-${rowIndex}-actions">
      <mxGeometry x="10" y="10" width="35" height="20" as="geometry" />
    </mxCell>
    
    <mxCell id="class-${index}-btn-delete-${rowIndex}" value="Eliminar" style="rounded=1;fillColor=#f8cecc;strokeColor=#b85450;fontColor=#333333;align=center;verticalAlign=middle;fontStyle=0;fontSize=10;" vertex="1" parent="class-${index}-cell-${rowIndex}-actions">
      <mxGeometry x="50" y="10" width="35" height="20" as="geometry" />
    </mxCell>`;
  }
  
  // Agregar botón de guardar para la tabla
  tableHtml += `
    <!-- Botón Guardar -->
    <mxCell id="class-${index}-save-button" value="Guardar" style="rounded=1;fillColor=#0057D8;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=0;fontSize=12;" vertex="1" parent="page-container">
      <mxGeometry x="350" y="${yOffset + 130}" width="110" height="30" as="geometry" />
    </mxCell>`;
  
  return tableHtml;
};

/**
 * Determina el tipo de campo apropiado basado en el atributo
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
