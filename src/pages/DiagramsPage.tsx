import { useRef, useState, useEffect } from 'react';
import { DrawIoEmbedRef } from 'react-drawio';
import { useNavigate } from 'react-router-dom';

// Components
import { ClassView } from '../components/ClassView';
import { DiagramEditor } from '../components/DiagramEditor';
import { DiagramHeader } from '../components/DiagramHeader';
import { DiagramManager } from '../components/DiagramManager';
import { ErrorMessage } from '../components/ErrorMessage';
import { FileSelector } from '../components/FileSelector';
import { ImageMockupConverter } from '../components/ImageMockupConverter';
import { MockupSaveDialog } from '../components/MockupSaveDialog';
import { SaveDialog } from '../components/SaveDialog';

// Custom hooks and services
import { useDiagramManager } from '../hooks/useDiagramManager';
import { authApi } from '../services/apiService';

export const DiagramsPage = () => {
  const navigate = useNavigate();
  const drawioRef = useRef<DrawIoEmbedRef>(null);

  const {
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
    setError,
    setShowClasses,
    setShowSaveDialog,
    setNewFileName,
    setShowMockupSaveDialog,
    setMockupFileName,
    setShowDiagramManager,
    setShowImageConverter,
    setXmlContent,

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
  } = useDiagramManager(drawioRef);
  
  const handleLogout = () => {
    authApi.logout();
    navigate('/login');
  };
  
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={showClasses ? "w-full min-h-screen bg-gray-50" : "w-screen h-screen"}>
      {/* Error message component */}
      {error && (
        <ErrorMessage
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Header toolbar for diagram editing mode */}
      {!showClasses && (
        <DiagramHeader
          xmlContent={xmlContent}
          showFileSelector={showFileSelector}
          loadingExtract={loadingExtract}
          loadingMockup={loadingMockup}
          onToggleFileSelector={handleToggleFileSelector}
          onToggleDiagramManager={handleToggleDiagramManager}
          onToggleImageConverter={handleToggleImageConverter}
          onExtractClasses={handleExtractClasses}
          onConvertToMockup={handleConvertToMockup}
          onDownload={handleDownload}
          onExportXml={handleExportXml}
          onCreateNew={handleCreateNewDiagram}
          onLogout={handleLogout}
          onGoHome={handleGoHome}
        />
      )}

      {/* File selector sidebar */}
      {showFileSelector && (
        <FileSelector
          availableFiles={availableFiles}
          fileName={fileName}
          onFileSelect={handleFileSelect}
          onNewDiagram={() => {
            handleToggleFileSelector();
            handleCreateNewDiagram();
          }}
        />
      )}

      {/* Save dialog */}
      {showSaveDialog && (
        <SaveDialog
          newFileName={newFileName}
          loadingSave={loadingSave}
          onChangeFileName={setNewFileName}
          onSaveConfirm={handleSaveAsConfirm}
          onCancel={() => setShowSaveDialog(false)}
        />
      )}

      {/* Mockup save dialog */}
      {showMockupSaveDialog && (
        <MockupSaveDialog
          mockupFileName={mockupFileName}
          loadingSave={loadingSave}
          onChangeFileName={setMockupFileName}
          onSaveConfirm={handleMockupSaveConfirm}
          onCancel={() => setShowMockupSaveDialog(false)}
        />
      )}

      {/* Diagram manager dialog */}
      {showDiagramManager && (
        <DiagramManager
          availableFiles={availableFiles}
          onRename={handleRenameDiagram}
          onDelete={handleDeleteDiagram}
          onSelectFile={handleFileSelect}
          onClose={() => setShowDiagramManager(false)}
        />
      )}

      {/* Image to mockup converter */}
      {showImageConverter && (
        <ImageMockupConverter
          onMockupGenerated={handleImageMockupGenerated}
          onClose={() => setShowImageConverter(false)}
        />
      )}

      {/* Main content area */}
      {showClasses ? (
        <ClassView
          classes={classes}
          onBackToDiagram={() => setShowClasses(false)}
          onDownload={handleDownload}
          onGoHome={handleGoHome}
        />
      ) : (
        <DiagramEditor
          ref={drawioRef}
          xmlContent={xmlContent}
          fileName={fileName}
          currentFile={currentFile}
          files={files}
          onAutoSave={handleAutoSave}
          setXmlContent={setXmlContent}
        />
      )}
    </div>
  );
}; 