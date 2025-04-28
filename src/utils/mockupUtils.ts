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
    <mxGraphModel dx="962" dy="1606" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <!-- Empty mockup page -->
        <mxCell id="page-container" value="" style="strokeWidth=1;shadow=0;dashed=0;align=center;shape=mxgraph.mockup.containers.browserWindow;rSize=0;strokeColor=#666666;strokeColor2=#008cff;strokeColor3=#c4c4c4;mainText=,;recursiveResize=0;" vertex="1" parent="1">
          <mxGeometry x="20" y="60" width="800" height="850" as="geometry" />
        </mxCell>
        <mxCell id="page-title" value="Nueva Página" style="strokeWidth=1;shadow=0;dashed=0;align=center;shape=mxgraph.mockup.containers.anchor;fontSize=17;fontColor=#666666;align=left;" vertex="1" parent="page-container">
          <mxGeometry x="60" y="12" width="110" height="26" as="geometry" />
        </mxCell>
        <mxCell id="page-url" value="https://www.example.com" style="strokeWidth=1;shadow=0;dashed=0;align=center;shape=mxgraph.mockup.containers.anchor;rSize=0;fontSize=17;fontColor=#666666;align=left;" vertex="1" parent="page-container">
          <mxGeometry x="130" y="60" width="250" height="26" as="geometry" />
        </mxCell>
        <!-- Example form field -->
        <mxCell id="page-field-1" value="Campo de ejemplo" style="shadow=0;dashed=0;shape=mxgraph.bootstrap.rrect;rSize=5;strokeColor=#CED4DA;strokeWidth=1;fillColor=#E9ECEF;fontColor=#505050;align=left;verticalAlign=middle;spacingLeft=10;fontSize=14;" vertex="1" parent="page-container">
          <mxGeometry x="30" y="200" width="740" height="40" as="geometry" />
        </mxCell>
        <!-- Submit button -->
        <mxCell id="page-button" value="Guardar" style="rounded=1;fillColor=#0057D8;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=0;fontSize=12;sketch=0;" vertex="1" parent="page-container">
          <mxGeometry x="357" y="300" width="86" height="33" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}; 