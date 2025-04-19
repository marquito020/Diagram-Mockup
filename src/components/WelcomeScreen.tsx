import React from 'react';

interface WelcomeScreenProps {
  onCreateNew: () => void;
  onOpenExisting: () => void;
  onFileImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onCreateNew,
  onOpenExisting,
  onFileImport
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Diagramas UML</h1>
        <p className="text-gray-600 mb-8">
          Bienvenido a la herramienta de diagramación UML. Crea un nuevo diagrama, abre uno existente o importa desde archivo para comenzar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={onCreateNew}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300"
          >
            Crear nuevo diagrama
          </button>
          <button
            onClick={onOpenExisting}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300"
          >
            Abrir diagrama existente
          </button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-700 mb-4 font-medium">¿Ya tienes un diagrama en tu dispositivo?</p>
          <label className="cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300">
            <span>Importar desde archivo</span>
            <input
              type="file"
              accept=".xml,.drawio,.drawio.xml"
              className="hidden"
              onChange={onFileImport}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
