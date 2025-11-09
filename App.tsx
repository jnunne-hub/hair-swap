import React, { useState, useCallback, useMemo } from 'react';
import { CameraCapture } from './components/CameraCapture';
import { generateSwappedHairImage } from './services/geminiService';
import { fileToBase64 } from './utils/imageUtils';
import { CameraIcon, UploadIcon, SparklesIcon, ArrowPathIcon, UserIcon, FaceSmileIcon, DownloadIcon } from './components/icons';

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [hairImage, setHairImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

  const handleUserImageCapture = useCallback((imageDataUrl: string) => {
    setUserImage(imageDataUrl);
    setIsCameraOpen(false);
  }, []);

  const handleUserImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setUserImage(base64);
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement de l'image.");
        console.error(err);
      }
    }
  };

  const handleHairImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setHairImage(base64);
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement de l'image.");
        console.error(err);
      }
    }
  };

  const handleGenerate = async () => {
    if (!userImage || !hairImage) {
      setError('Veuillez fournir les deux images.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResultImage(null);
    try {
      const generatedImage = await generateSwappedHairImage(userImage, hairImage);
      setResultImage(generatedImage);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue est survenue.';
      setError(`La génération a échoué: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'ai-hair-swap-result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setUserImage(null);
    setHairImage(null);
    setResultImage(null);
    setIsLoading(false);
    setError(null);
    // Reset file input value
    const fileInput = document.getElementById('hair-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  };
  
  const canGenerate = useMemo(() => userImage && hairImage && !isLoading, [userImage, hairImage, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8 font-sans">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            AI Hair Swap
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Prenez une photo, choisissez une coiffure, et laissez l'IA créer votre nouveau look.
          </p>
        </header>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
            <strong className="font-bold">Erreur: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Images */}
          <ImagePanel title="1. Votre Photo" icon={<UserIcon />}>
            {userImage ? (
              <img src={userImage} alt="Utilisateur" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900/50 rounded-lg p-4">
                  <div className="flex flex-col w-full max-w-xs mx-auto gap-4">
                      <button
                        onClick={() => setIsCameraOpen(true)}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold rounded-lg bg-gray-700 text-gray-200 hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-md"
                      >
                        <CameraIcon className="h-5 w-5"/>
                        <span>Ouvrir la caméra</span>
                      </button>

                      <div className="relative flex py-2 items-center">
                          <div className="flex-grow border-t border-gray-600"></div>
                          <span className="flex-shrink mx-4 text-gray-500 text-sm">OU</span>
                          <div className="flex-grow border-t border-gray-600"></div>
                      </div>

                      <label
                          htmlFor="user-upload"
                          className="cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-3 font-semibold rounded-lg bg-gray-700 text-gray-200 hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-md"
                      >
                          <UploadIcon className="h-5 w-5"/>
                          <span>Télécharger une photo</span>
                          <input id="user-upload" type="file" accept="image/*" className="hidden" onChange={handleUserImageUpload} />
                      </label>
                  </div>
              </div>
            )}
          </ImagePanel>

          <ImagePanel title="2. Style de Cheveux" icon={<FaceSmileIcon />}>
            {hairImage ? (
              <img src={hairImage} alt="Style de cheveux" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <label htmlFor="hair-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-600 hover:border-pink-500 hover:bg-gray-800 transition-all duration-300">
                <UploadIcon />
                <span className="mt-2 text-sm font-medium">Télécharger une image</span>
                <input id="hair-upload" type="file" accept="image/*" className="hidden" onChange={handleHairImageUpload} />
              </label>
            )}
          </ImagePanel>

          {/* Result Image */}
          <ImagePanel title="3. Résultat Magique" icon={<SparklesIcon />}>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
                    <p className="mt-4 text-gray-300 text-sm">L'IA est au travail...</p>
                </div>
            ) : resultImage ? (
              <div className="relative w-full h-full">
                <img src={resultImage} alt="Résultat" className="w-full h-full object-cover rounded-lg" />
                <button
                  onClick={handleDownload}
                  className="absolute bottom-3 right-3 p-2 bg-gray-900/60 text-white rounded-full hover:bg-gray-900/90 transition-all duration-300 backdrop-blur-sm"
                  aria-label="Télécharger l'image"
                >
                  <DownloadIcon />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center text-gray-500">
                <p>Le résultat apparaîtra ici.</p>
              </div>
            )}
          </ImagePanel>
        </main>
        
        {isCameraOpen && <CameraCapture onCapture={handleUserImageCapture} onClose={() => setIsCameraOpen(false)} />}
      </div>
      
      {/* Sticky Footer for Actions */}
       <footer className="sticky bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm p-4 mt-8 border-t border-gray-700">
          <div className="container mx-auto max-w-6xl flex justify-center items-center gap-4">
              <button
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="flex items-center justify-center gap-2 px-8 py-3 font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg disabled:shadow-none"
              >
                  <SparklesIcon />
                  {isLoading ? 'Génération...' : 'Générer'}
              </button>
              <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition-all duration-300"
              >
                  <ArrowPathIcon />
                  Recommencer
              </button>
          </div>
      </footer>
    </div>
  );
};

interface ImagePanelProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ImagePanel: React.FC<ImagePanelProps> = ({ title, icon, children }) => (
  <div className="bg-gray-800 rounded-xl p-4 flex flex-col shadow-lg">
    <div className="flex items-center gap-2 mb-3 text-gray-300">
      {icon}
      <h2 className="font-semibold">{title}</h2>
    </div>
    <div className="aspect-square flex-grow bg-gray-900/50 rounded-lg overflow-hidden">
      {children}
    </div>
  </div>
);


export default App;