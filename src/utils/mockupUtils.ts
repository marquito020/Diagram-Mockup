/**
 * Utilities for mockup diagrams
 */

/**
 * Creates a template for an empty mockup
 */
export const createEmptyMockup = (): string => {
  const currentDate = new Date().toISOString();
  
  return `<mxfile host="embed.diagrams.net" modified="${currentDate}" agent="Mozilla/5.0" version="26.2.12">
  <diagram id="mockup-diagram" name="Mockup">
    <mxGraphModel dx="962" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- Empty mockup page with browser window -->
        <mxCell id="page-container" value="" style="strokeWidth=1;shadow=0;dashed=0;align=center;shape=mxgraph.mockup.containers.browserWindow;rSize=0;strokeColor=#666666;strokeColor2=#008cff;strokeColor3=#c4c4c4;mainText=,;recursiveResize=0;" vertex="1" parent="1">
          <mxGeometry x="14" y="10" width="800" height="600" as="geometry" />
        </mxCell>
        
        <mxCell id="page-title" value="Nueva Página" style="strokeWidth=1;shadow=0;dashed=0;align=center;shape=mxgraph.mockup.containers.anchor;fontSize=17;fontColor=#666666;align=left;" vertex="1" parent="page-container">
          <mxGeometry x="60" y="12" width="110" height="26" as="geometry" />
        </mxCell>
        
        <mxCell id="page-url" value="https://www.example.com" style="strokeWidth=1;shadow=0;dashed=0;align=center;shape=mxgraph.mockup.containers.anchor;rSize=0;fontSize=17;fontColor=#666666;align=left;" vertex="1" parent="page-container">
          <mxGeometry x="130" y="60" width="250" height="26" as="geometry" />
        </mxCell>
        
        <!-- Título de la tabla -->
        <mxCell id="header-title" value="Tabla de Atributos" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontStyle=1" vertex="1" parent="page-container">
          <mxGeometry x="150" y="100" width="497" height="30" as="geometry" />
        </mxCell>
        
        <!-- Botón Crear -->
        <mxCell id="create-button" value="+ Crear" style="rounded=1;fillColor=#4CAF50;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=0;fontSize=12;" vertex="1" parent="page-container">
          <mxGeometry x="40" y="110" width="80" height="30" as="geometry" />
        </mxCell>
        
        <!-- Tabla completa -->
        <mxCell id="table" value="" style="shape=table;html=1;whiteSpace=wrap;startSize=0;container=1;collapsible=0;childLayout=tableLayout;" vertex="1" parent="page-container">
          <mxGeometry x="40" y="140" width="730" height="120" as="geometry" />
        </mxCell>
        
        <!-- Fila de cabecera -->
        <mxCell id="header-row" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=#dae8fc;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=#6c8ebf;" vertex="1" parent="table">
          <mxGeometry width="730" height="40" as="geometry" />
        </mxCell>
        
        <mxCell id="header-nombre" value="Nombre" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#dae8fc;top=0;left=0;bottom=0;right=0;pointerEvents=1;strokeColor=#6c8ebf;fontStyle=1;" vertex="1" parent="header-row">
          <mxGeometry width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="header-tipo" value="Tipo" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#dae8fc;top=0;left=0;bottom=0;right=0;pointerEvents=1;strokeColor=#6c8ebf;fontStyle=1;" vertex="1" parent="header-row">
          <mxGeometry x="182" width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="header-desc" value="Descripción" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#dae8fc;top=0;left=0;bottom=0;right=0;pointerEvents=1;strokeColor=#6c8ebf;fontStyle=1;" vertex="1" parent="header-row">
          <mxGeometry x="364" width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="header-actions" value="Acciones" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#dae8fc;top=0;left=0;bottom=0;right=0;pointerEvents=1;strokeColor=#6c8ebf;fontStyle=1;" vertex="1" parent="header-row">
          <mxGeometry x="546" width="184" height="40" as="geometry">
            <mxRectangle width="184" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <!-- Fila 1: id -->
        <mxCell id="row-id" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=#f5f5f5;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=#666666;" vertex="1" parent="table">
          <mxGeometry y="40" width="730" height="40" as="geometry" />
        </mxCell>
        
        <mxCell id="cell-id-1" value="id" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#f5f5f5;top=0;left=0;bottom=0;right=0;pointerEvents=1;align=left;spacingLeft=10;strokeColor=#666666;fontColor=#333333;" vertex="1" parent="row-id">
          <mxGeometry width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="cell-id-2" value="Integer" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#f5f5f5;top=0;left=0;bottom=0;right=0;pointerEvents=1;strokeColor=#666666;fontColor=#333333;" vertex="1" parent="row-id">
          <mxGeometry x="182" width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="cell-id-3" value="Identificador único" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#f5f5f5;top=0;left=0;bottom=0;right=0;pointerEvents=1;align=left;spacingLeft=10;strokeColor=#666666;fontColor=#333333;" vertex="1" parent="row-id">
          <mxGeometry x="364" width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="cell-id-actions" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#f5f5f5;top=0;left=0;bottom=0;right=0;pointerEvents=1;strokeColor=#666666;fontColor=#333333;" vertex="1" parent="row-id">
          <mxGeometry x="546" width="184" height="40" as="geometry">
            <mxRectangle width="184" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="btn-edit-1" value="Editar" style="rounded=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;align=center;verticalAlign=middle;fontStyle=0;fontSize=10;spacingLeft=0;spacingRight=0;spacingTop=0;spacingBottom=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="578" y="206" width="50" height="20" as="geometry" />
        </mxCell>
        
        <mxCell id="btn-delete-1" value="Eliminar" style="rounded=1;fillColor=#f8cecc;strokeColor=#b85450;fontColor=#333333;align=center;verticalAlign=middle;fontStyle=0;fontSize=10;spacingLeft=0;spacingRight=0;spacingTop=0;spacingBottom=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="638" y="206" width="50" height="20" as="geometry" />
        </mxCell>
        
        <!-- Fila 2: nombre -->
        <mxCell id="row-nombre" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=none;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=inherit;" vertex="1" parent="table">
          <mxGeometry y="80" width="730" height="40" as="geometry" />
        </mxCell>
        
        <mxCell id="cell-nombre-1" value="nombre" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=none;top=0;left=0;bottom=0;right=0;pointerEvents=1;align=left;spacingLeft=10;" vertex="1" parent="row-nombre">
          <mxGeometry width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="cell-nombre-2" value="String" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=none;top=0;left=0;bottom=0;right=0;pointerEvents=1;" vertex="1" parent="row-nombre">
          <mxGeometry x="182" width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="cell-nombre-3" value="Nombre del elemento" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=none;top=0;left=0;bottom=0;right=0;pointerEvents=1;align=left;spacingLeft=10;" vertex="1" parent="row-nombre">
          <mxGeometry x="364" width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="cell-nombre-actions" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=none;top=0;left=0;bottom=0;right=0;pointerEvents=1;" vertex="1" parent="row-nombre">
          <mxGeometry x="546" width="184" height="40" as="geometry">
            <mxRectangle width="184" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="btn-edit-2" value="Editar" style="rounded=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;align=center;verticalAlign=middle;fontStyle=0;fontSize=10;spacingLeft=0;spacingRight=0;spacingTop=0;spacingBottom=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="578" y="246" width="50" height="20" as="geometry" />
        </mxCell>
        
        <mxCell id="btn-delete-2" value="Eliminar" style="rounded=1;fillColor=#f8cecc;strokeColor=#b85450;fontColor=#333333;align=center;verticalAlign=middle;fontStyle=0;fontSize=10;spacingLeft=0;spacingRight=0;spacingTop=0;spacingBottom=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="638" y="246" width="50" height="20" as="geometry" />
        </mxCell>
        
        <!-- Fila 3: activo -->
        <mxCell id="row-activo" value="" style="shape=tableRow;horizontal=0;startSize=0;swimlaneHead=0;swimlaneBody=0;top=0;left=0;bottom=0;right=0;collapsible=0;dropTarget=0;fillColor=#f5f5f5;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;strokeColor=#666666;" vertex="1" parent="table">
          <mxGeometry y="120" width="730" height="40" as="geometry" />
        </mxCell>
        
        <mxCell id="cell-activo-1" value="activo" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#f5f5f5;top=0;left=0;bottom=0;right=0;pointerEvents=1;align=left;spacingLeft=10;strokeColor=#666666;fontColor=#333333;" vertex="1" parent="row-activo">
          <mxGeometry width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="cell-activo-2" value="Boolean" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#f5f5f5;top=0;left=0;bottom=0;right=0;pointerEvents=1;strokeColor=#666666;fontColor=#333333;" vertex="1" parent="row-activo">
          <mxGeometry x="182" width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="cell-activo-3" value="Estado del elemento" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#f5f5f5;top=0;left=0;bottom=0;right=0;pointerEvents=1;align=left;spacingLeft=10;strokeColor=#666666;fontColor=#333333;" vertex="1" parent="row-activo">
          <mxGeometry x="364" width="182" height="40" as="geometry">
            <mxRectangle width="182" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="cell-activo-actions" style="shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;overflow=hidden;fillColor=#f5f5f5;top=0;left=0;bottom=0;right=0;pointerEvents=1;strokeColor=#666666;fontColor=#333333;" vertex="1" parent="row-activo">
          <mxGeometry x="546" width="184" height="40" as="geometry">
            <mxRectangle width="184" height="40" as="alternateBounds" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="btn-edit-3" value="Editar" style="rounded=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;align=center;verticalAlign=middle;fontStyle=0;fontSize=10;spacingLeft=0;spacingRight=0;spacingTop=0;spacingBottom=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="578" y="286" width="50" height="20" as="geometry" />
        </mxCell>
        
        <mxCell id="btn-delete-3" value="Eliminar" style="rounded=1;fillColor=#f8cecc;strokeColor=#b85450;fontColor=#333333;align=center;verticalAlign=middle;fontStyle=0;fontSize=10;spacingLeft=0;spacingRight=0;spacingTop=0;spacingBottom=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="638" y="286" width="50" height="20" as="geometry" />
        </mxCell>
        
        <!-- Botón Guardar Tabla -->
        <mxCell id="save-button" value="Guardar Tabla" style="rounded=1;fillColor=#0057D8;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=0;fontSize=12;" vertex="1" parent="page-container">
          <mxGeometry x="350" y="350" width="110" height="30" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}; 