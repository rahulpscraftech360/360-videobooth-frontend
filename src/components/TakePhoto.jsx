import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Initialize Supabase client
const supabaseUrl = 'https://ntzycljbietbzhljdulv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50enljbGpiaWV0YnpobGpkdWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTc4NTUsImV4cCI6MjA1OTY3Mzg1NX0.mjRdionKWnvcTfmNFh3efaeYyTumdXm_cXJTavaPmwo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TakePhoto() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, gender, character } = location.state || { name: '', email: '', gender: '', character: '' };

  const [photo, setPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const [error, setError] = useState(null); // Track error messages

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setPhoto(null); // Clear the photo to show the camera feed again
  };

  const handleContinue = async () => {
    if (!photo) {
      alert('Please take a photo before continuing!');
      return;
    }

    setIsUploading(true); // Start loading
    setError(null); // Clear any previous errors
    try {
      // 1. Upload user's photo
      const blob = await fetch(photo).then(res => res.blob());
      const filePath = `photos/${Date.now()}.png`;
      const { error: photoUploadError } = await supabase.storage
        .from('360video')
        .upload(filePath, blob);
    
      if (photoUploadError) {
        throw photoUploadError;
      }
    
      // Get the public URL of uploaded user photo
      const { data: { publicUrl } } = supabase.storage
        .from('360video')
        .getPublicUrl(filePath);
    
      // 2. Upload character image
      const characterBlob = await fetch(character).then(res => res.blob());
      const characterPath = `characters/${Date.now()}_character.png`;
      const { error: characterUploadError } = await supabase.storage
        .from('360video')
        .upload(characterPath, characterBlob);
    
      if (characterUploadError) {
        throw characterUploadError;
      }
    
      // Get the public URL of uploaded character image
      const { data: { publicUrl: characterUrl } } = supabase.storage
        .from('360video')
        .getPublicUrl(characterPath);
    
      // 3. Save both URLs to userInfo table
      const { error: updateError } = await supabase
        .from('userInfo')
        .upsert([
          {
            email: email,
            images_url: publicUrl,
            'ai-image': characterUrl
          }
        ],
        { onConflict: 'email' });
    
      if (updateError) {
        throw updateError;
      }
    
      // Log success
      console.log('Upload successful:');
      console.log('- User photo URL:', publicUrl);
      console.log('- Character URL:', characterUrl);
    
  
      const getPromptsForCharacter = (character) => {
        let BackgroundPrompt = "";
        let CharacterPrompt = "";

        switch (character) {
          case "/images/male_1.jpeg":
            BackgroundPrompt = "\"0\": \"Front view - A grand celestial battlefield bathed in golden sunlight, with floating ruins of an ancient empire suspended in the sky. Molten cracks run along the marble ground, pulsating with radiant energy. Ethereal embers drift through the air, casting a warm glow. Volumetric lighting, ultra-detailed, 8K fantasy landscape.\",\n  \n  \"15\": \"Right-side profile view - A vast horizon where the sky blends from deep oranges to dark blues, resembling an eternal dusk. Towering celestial spires reach into the heavens, each adorned with glowing sigils. The air is thick with cosmic energy, and faint silhouettes of divine beings watch from afar. Hyper-detailed, cinematic, 8K fantasy backdrop.\",\n  \n  \"30\": \"Back view - A divine citadel floating above an endless sea of golden clouds, its towers reflecting the light of a burning sun. Massive celestial gates loom in the distance, partially open, revealing the abyss of time itself. The winds swirl with golden dust, creating an ethereal atmosphere. Ultra-realistic, 8K high-fantasy setting.\",\n  \n  \"45\": \"Left-side profile view - The remnants of a celestial battlefield, where shattered weapons and fallen banners are half-buried in glowing embers. The sky flickers with unstable rifts, where glimpses of different dimensions can be seen. Volumetric god rays pierce through the dust-laden air, adding to the divine yet haunting scenery. Hyper-detailed, cinematic, 8K otherworldly landscape.\",\n  \n  \"60\": \"Front view - A grand cosmic forge suspended in an infinite void, where streams of molten gold flow from floating islands, shaping divine weapons in mid-air. The Sentinel stands before a titanic anvil, glowing with the heat of a newborn star. The background pulsates with celestial energy, giving a sense of boundless power. 8K ultra-detailed, cinematic, godly atmosphere.\",\n  \n  \"75\": \"Right-side profile view - A sacred temple carved into the heart of a dying sun, its massive pillars glowing with ancient inscriptions. Solar flares burst in the distance, casting dynamic shadows across the marble floor. The air is thick with divine energy, creating a gravity-defying aura where embers float effortlessly. Hyper-detailed, cinematic, 8K celestial environment.\",\n  \n  \"90\": \"Back view - A bridge of light stretching across the cosmos, leading toward the Celestial Throne—a colossal, radiant structure suspended in deep space. Stars swirl in slow motion behind it, forming a nebula in the shape of a divine sigil. The air crackles with pure energy, and distant echoes of forgotten deities whisper through the void. Ultra-realistic, 8K cosmic fantasy backdrop.\",\n  \n  \"105\": \"Left-side profile view - The heart of an eternal storm, where lightning infused with celestial fire dances across a sky of swirling nebulae. Massive floating islands drift through the chaotic winds, each marked with the scars of ancient wars. Solaris Sentinel stands at the edge of one, overlooking the battlefield of gods. Hyper-detailed, cinematic, 8K high-fantasy background.\",\n  \n  \"120\": \"Front view - A divine council chamber at the peak of existence, surrounded by colossal statues of forgotten deities. A sacred flame burns in the center, casting long shadows across the crystalline walls. The floor is engraved with shifting cosmic patterns, glowing in response to the Sentinel’s presence. 8K ultra-detailed, cinematic, god-tier fantasy setting.\"\n",

              CharacterPrompt = "\n  \"0\": \"Front view - A noble warrior with a face chiseled from years of battle, his golden eyes radiating with the power of the eternal flame. His flowing, fiery-orange hair seems to glow like embers, and his sun-kissed skin is etched with ancient, glowing sigils. His expression is resolute, carrying the weight of a thousand victories. His radiant golden armor is intricately detailed with celestial engravings, reflecting the light of an unseen sun. Hyper-realistic, ultra-detailed, cinematic lighting, 8K masterpiece.\",\n  \n  \"15\": \"Right-side profile view - Solaris Sentinel’s sharp features are highlighted by the warm glow of his burning aura. His golden eyes gleam with wisdom and intensity, framed by a strong jawline and high cheekbones. His regal, battle-worn armor shimmers, covered in delicate celestial etchings that pulse with fiery energy. Volumetric lighting, hyper-detailed, ultra-realistic, 8K cinematic fantasy portrait.\",\n  \n  \"30\": \"Back view - Solaris Sentinel stands with his back to the viewer, his long, ember-like hair cascading down his gilded armor, flickering like a living flame. His broad shoulders exude strength, and his celestial cape, woven from strands of pure sunlight, flows with an ethereal radiance. The intricate engravings on the back of his armor glow with molten energy, pulsating in sync with his divine presence. The scene emphasizes his godly stature, making him appear as an unstoppable force of cosmic power. Hyper-detailed, cinematic, ultra-realistic, 8K fantasy composition.\",\n  \n  \"45\": \"Left-side profile view - Solaris Sentinel’s hair flows in slow motion, as if caught in a perpetual updraft of heat. His jawline is sharp, and his expression is calm yet fierce. The celestial runes inscribed across his skin glow brighter, resonating with an unseen force. The atmosphere around him wavers, bending to his divine energy. Hyper-realistic, 8K cinematic masterpiece.\",\n  \n  \"60\": \"Front view - The full intensity of Solaris Sentinel’s gaze pierces through the viewer’s soul. His golden eyes shine like miniature suns, and his battle-worn armor reflects the infinite energy of the celestial forge. His aura radiates an overwhelming sense of warmth and power, as if standing in the presence of a divine being. Hyper-realistic, ultra-detailed, cinematic 8K godlike fantasy portrait.\",\n  \n  \"75\": \"Right-side profile view - A different angle of Solaris Sentinel, with his celestial crown catching the divine light. His expression is both powerful and serene, exuding wisdom. His golden armor reflects the cosmic energy surrounding him, and faint embers float in the air. Hyper-realistic, ultra-detailed, cinematic 8K fantasy portrait.\",\n  \n  \"90\": \"Back view - Solaris Sentinel’s long, ember-like hair cascades down his gilded armor, flickering like a living flame. His cape, woven from strands of pure sunlight, flows with a supernatural radiance. The air behind him shimmers with golden embers, trailing in his wake. Hyper-detailed, cinematic, 8K resolution, godly presence.\",\n  \n  \"105\": \"Left-side profile view - Solaris Sentinel, his determined gaze looking into the distance. His fiery hair moves gently with a celestial breeze, and the glowing sigils on his armor pulsate with power. His battle-worn armor carries the mark of countless victories. Hyper-detailed, cinematic, ultra-realistic, 8K fantasy portrait.\",\n  \n  \"120\": \"Front view - Solaris Sentinel stands with an ethereal glow surrounding him. His piercing golden eyes shine with unwavering conviction, and the celestial sigils carved into his skin pulse with radiant energy. His form seems almost too powerful for this realm, exuding the presence of a guardian from another plane. Hyper-realistic, ultra-detailed, cinematic 8K fantasy portrait.\"\n\n"
              ;
            break;
          case "/images/male_2.jpeg":
            BackgroundPrompt = "\"0\": \"A vast and endless abyss, where jagged black spires rise from the void like the fangs of an ancient beast. The ground is a shifting reflection of dark energy, distorting all who walk upon it. The sky is a swirling mass of deep purples and blacks, illuminated by a dying eclipse. Shadows seem to move with a will of their own, whispering secrets lost to time. Cinematic, hyper-detailed, ultra-realistic, 8K dark fantasy masterpiece.\",\n  \n  \"15\": \"A ruined celestial temple, its once-glorious architecture now twisted by void energy. Dark tendrils slither through the shattered walls, pulsing with a faint, eerie light. Floating shards of forgotten relics drift through the air, untouched by time. The sky above churns with a shifting vortex of violet and black, an endless storm of cosmic despair. Ultra-detailed, hyper-realistic, breathtaking 8K dark fantasy dreamscape.\",\n  \n  \"30\": \"An ancient battlefield bathed in eternal twilight, where fallen warriors are frozen in time, their spectral echoes lingering. The air is thick with mist, illuminated only by the dim glow of spectral lanterns. The remnants of colossal statues, half-buried in shadow, tell the tale of a forgotten war between gods and void entities. Cinematic, hyper-detailed, ultra-realistic 8K haunting fantasy scene.\",\n  \n  \"45\": \"A vast and ruined city of shadow, where crumbling towers stretch toward an endless black sky. Phantom lights flicker in the distance, and an eerie silence fills the air. The structures, though abandoned, seem to breathe, their surfaces shifting and warping with unnatural motion. A massive abyss looms in the center, swallowing all light. Cinematic, ultra-detailed, hyper-realistic 8K dark fantasy masterpiece.\",\n  \n  \"60\": \"A haunted ethereal forest, where twisted trees with glowing violet veins reach toward the heavens. The air is thick with ghostly fog, shifting and twisting with each passing moment. Faint whispers echo through the trees, remnants of ancient souls trapped within. A path of blackened stone leads deeper into the darkness, its destination unknown. Hyper-realistic, ultra-detailed, breathtaking 8K fantasy nightmare.\",\n  \n  \"75\": \"A floating void citadel, suspended in a sea of swirling cosmic energy. Its architecture is both gothic and alien, with spires that seem to fold in and out of reality. The sky above is a void of endless stars, shimmering like fractured glass. A massive rift pulses at the heart of the citadel, a portal to an unknown dimension. Cinematic, ultra-detailed, hyper-realistic 8K dark fantasy dreamscape.\",\n  \n  \"90\": \"A temple of shadows, hidden within a forgotten plane. Its walls shift and stretch as if alive, the very structure breathing with dark energy. Obsidian torches burn with violet fire, casting shifting patterns across the floor. A massive throne of blackened crystal rests at the center, its seat empty, awaiting its queen. Hyper-realistic, ultra-detailed, cinematic 8k\"",
              CharacterPrompt = "\n  \"0\": \"A strikingly beautiful yet fearsome Valkyrie of the void, her piercing violet eyes glowing with dark energy. Her raven-black hair flows like liquid shadow, shifting in unseen winds. Her flawless pale skin is marked with intricate, shimmering void runes. Her lips are a deep midnight purple, and her expression is one of both wisdom and deadly intent. Her elegant, high-collared armor, woven from ethereal shadow, pulsates with deep amethyst light. Ultra-detailed, cinematic, hyper-realistic, 8K dark fantasy portrait.\",\n  \n  \"15\": \"Side profile of Nyx Valkyrie, her sharp and angular features highlighted by the eerie glow of a phantom moon. Her violet eyes shine with unearthly intensity, framed by long lashes and shadowy war paint. Her sleek, form-fitting armor reflects faint whispers of spectral light. She exudes an aura of command and mystery, her presence both chilling and hypnotic. Hyper-realistic, ultra-detailed, cinematic 8K dark fantasy masterpiece.\",\n  \n  \"30\": \"Back view of Nyx Valkyrie, her midnight-black hair cascading down her sleek obsidian armor, which glows faintly with runes of forgotten power. Her feathered mantle of shadow extends outward like a cloak woven from living darkness. The air around her bends as if reality itself recoils from her presence. Hyper-detailed, cinematic, ultra-realistic, 8K haunting fantasy portrait.\",\n  \n  \"45\": \"Three-quarter view, Nyx Valkyrie’s head tilted slightly as if hearing the whispers of the void. Her violet irises flicker with cryptic knowledge, and her lips curl in a knowing smirk. The intricate void sigils on her forehead pulse faintly, resonating with unseen cosmic forces. Her form is bathed in the dim glow of an ethereal eclipse. Hyper-detailed, cinematic, ultra-realistic, 8K dark fantasy composition.\",\n  \n  \"60\": \"Front view, Nyx Valkyrie’s gaze piercing through the darkness, a silent challenge to any who dare meet her eyes. The swirling energy of the abyss flickers around her shoulders, creating a halo of living shadow. Her armor glows with cursed runes, pulsing with forbidden power. The embodiment of void mastery, her presence is overwhelming yet impossibly graceful. Hyper-realistic, ultra-detailed, cinematic 8K shadow fantasy portrait.\",\n  \n  \"75\": \"Side view, Nyx Valkyrie standing motionless as her form seems to dissolve into darkness at the edges. Her midnight purple lips part slightly, as if whispering incantations that twist reality itself. Her armor’s intricate void engravings shimmer, reflecting ancient energies lost to time. Her silhouette is both elegant and terrifying. Hyper-realistic, 8K cinematic masterpiece.\",\n  \n  \"90\": \"Back of the head view, Nyx Valkyrie’s long obsidian-black hair shifting like liquid shadow. Her shoulders, wrapped in a cloak of swirling darkness, seem to extend and contract as if alive. The spectral glow of violet energy pulsates across her back, revealing glimpses of the abyss within her. Hyper-detailed, cinematic, ultra-realistic, 8K dark fantasy portrait.\",\n  \n  \"105\": \"Front view, Nyx Valkyrie fully engulfed in a spectral aura of darkness, her violet eyes burning like twin void stars. Her high-collared armor gives her an air of dark royalty, and the swirling energy surrounding her hums with an eerie resonance. She is a goddess of the abyss, standing between dimensions. Hyper-realistic, ultra-detailed, cinematic 8K dark fantasy portrait.\"\n\n";
            break;
          case "/images/female_1.jpeg":
            BackgroundPrompt = "A magical forest filled with glowing fireflies";
            CharacterPrompt = "A mystical sorceress in an enchanted robe";
            break;
          case "/images/female_2.jpeg":
            BackgroundPrompt = "A vibrant futuristic city with neon lights";
            CharacterPrompt = "A stylish hacker with a high-tech gadget";
            break;
          default:
            BackgroundPrompt = "A default background";
            CharacterPrompt = "A generic character description";
        }

        return { BackgroundPrompt, CharacterPrompt };
      };

      const { BackgroundPrompt, CharacterPrompt } = getPromptsForCharacter(character);


      const jsondata2 = {

          "11": {
            "inputs": {
              "enabled": true,
              "swap_model": "inswapper_128.onnx",
              "facedetection": "retinaface_resnet50",
              "face_restore_model": "codeformer-v0.1.0.pth",
              "face_restore_visibility": 0.5,
              "codeformer_weight": 1,
              "detect_gender_input": "no",
              "detect_gender_source": "no",
              "input_faces_index": "0",
              "source_faces_index": "0",
              "console_log_level": 1,
              "input_image": [
                "37",
                0
              ],
              "source_image": [
                "30",
                0
              ]
            },
            "class_type": "ReActorFaceSwap",
            "_meta": {
              "title": "ReActor 🌌 Fast Face Swap"
            }
          },
          "14": {
            "inputs": {
              "images": [
                "11",
                0
              ]
            },
            "class_type": "PreviewImage",
            "_meta": {
              "title": "Preview Image"
            }
          },
          "26": {
            "inputs": {
              "model_name": "RealESRGAN_x4plus.pth"
            },
            "class_type": "Upscale Model Loader",
            "_meta": {
              "title": "Upscale Model Loader"
            }
          },
          "27": {
            "inputs": {
              "per_batch": 17,
              "upscale_model": [
                "26",
                0
              ],
              "images": [
                "11",
                0
              ]
            },
            "class_type": "ImageUpscaleWithModelBatched",
            "_meta": {
              "title": "Image Upscale With Model Batched"
            }
          },
          "28": {
            "inputs": {
              "images": [
                "27",
                0
              ]
            },
            "class_type": "PreviewImage",
            "_meta": {
              "title": "Preview Image"
            }
          },
          "30": {
            "inputs": {
              "supabase_url": "https://ntzycljbietbzhljdulv.supabase.co",
              "supabase_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50enljbGpiaWV0YnpobGpkdWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTc4NTUsImV4cCI6MjA1OTY3Mzg1NX0.mjRdionKWnvcTfmNFh3efaeYyTumdXm_cXJTavaPmwo",
              "table_name": "userInfo",
              "image_column": "images_url"
            },
            "class_type": "SupabaseTableWatcherNode",
            "_meta": {
              "title": "Supabase Table Watcher"
            }
          },
          "31": {
            "inputs": {
              "supabase_url": "https://ntzycljbietbzhljdulv.supabase.co",
              "supabase_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50enljbGpiaWV0YnpobGpkdWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTc4NTUsImV4cCI6MjA1OTY3Mzg1NX0.mjRdionKWnvcTfmNFh3efaeYyTumdXm_cXJTavaPmwo",
              "table_name": "userInfo",
              "image_column": "ai-image"
            },
            "class_type": "SupabaseTableWatcherNode",
            "_meta": {
              "title": "Supabase Table Watcher"
            }
          },
          "32": {
            "inputs": {
              "supabase_url": "https://ntzycljbietbzhljdulv.supabase.co",
              "supabase_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50enljbGpiaWV0YnpobGpkdWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTc4NTUsImV4cCI6MjA1OTY3Mzg1NX0.mjRdionKWnvcTfmNFh3efaeYyTumdXm_cXJTavaPmwo",
              "bucket": "360video",
              "base_file_name": "output-image",
              "image": [
                "27",
                0
              ],
              "id": [
                "31",
                2
              ]
            },
            "class_type": "SupabaseImageUploader",
            "_meta": {
              "title": "Upload Image to Supabase"
            }
          },
          "35": {
            "inputs": {
              "images": [
                "37",
                0
              ]
            },
            "class_type": "PreviewImage",
            "_meta": {
              "title": "Preview Image"
            }
          },
          "36": {
            "inputs": {
              "images": [
                "30",
                0
              ]
            },
            "class_type": "PreviewImage",
            "_meta": {
              "title": "Preview Image"
            }
          },
          "37": {
            "inputs": {
              "aggressive": true,
              "image": [
                "31",
                0
              ]
            },
            "class_type": "FreeMemoryImage",
            "_meta": {
              "title": "Free Memory (Image)"
            }
        
        }
      }


      // Step 4: Send data to your API
      const response = await fetch("http://localhost:3001/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: {
            class_type: "workflow",
            nodes: jsondata2
          }
        })
        
      });

      if (!response.ok) {
        throw new Error("Failed to send data to API");
      }

      const result = await response.json();
      console.log("Prompt sent successfully:", result);
      // Navigate to success page
      navigate("/success");
    } catch (error) {
      console.error("Error:", error);
      // setFailed(true);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: 'url(/images/iPad.png)' }}
    >
      <div className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-2xl sm:text-3xl mt-10 sm:mt-20 font-semibold text-white mb-4 sm:mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
          TAKE A PHOTO
        </h1>

        {/* Photo Capture Area */}
        <div className="relative w-full max-w-2xl aspect-video flex justify-center items-center rounded-lg overflow-hidden ">
          {photo ? (
            // Show the captured photo preview
            <img
              src={photo}
              alt="Captured Photo"
              className="w-full h-full object-contain"
            />
          ) : (
            // Show a placeholder when no photo is taken
            <div className="text-gray-500">No photo captured</div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
          className="hidden"
          id="fileInput"
        />

        {/* Buttons */}
        <div className="mt-3 sm:mt-8 w-full max-w-md">
          {photo ? (
            // Show "Retake" and "Continue" buttons after capturing a photo
            <>
              <div className="mb-4">
                <button
                  className="w-[90%] sm:w-[320px] h-[60px] sm:h-[65px] bg-cover bg-center font-bold text-red-500 rounded focus:outline-none focus:shadow-outline"
                  style={{
                    backgroundImage: 'url(/images/redbutton.png)',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '20px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  }}
                  onClick={handleRetake}
                >
                  Retake
                </button>
              </div>
              <div>
                <button
                  className="w-[90%] sm:w-[320px] h-[60px] sm:h-[65px] bg-cover bg-center font-bold text-red-500 rounded focus:outline-none focus:shadow-outline"
                  style={{
                    backgroundImage: 'url(/images/greenbutton.png)',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '20px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  }}
                  onClick={handleContinue}
                  disabled={isUploading} // Disable button while uploading
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center">
                      <span>Uploading...</span>
                      <div className="ml-2 animate-spin">🔄</div> {/* Loading spinner */}
                    </div>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
              {error && (
                <div className="mt-4 text-red-500">
                  {error}
                </div>
              )}
            </>
          ) : (
            // Show "Capture Photo" button when no photo is taken
            <button
              className="w-[90%] sm:w-[320px] h-[60px] sm:h-[65px] bg-cover bg-center font-bold text-red-500 rounded focus:outline-none focus:shadow-outline"
              style={{
                backgroundImage: 'url(/images/redbutton.png)',
                fontFamily: 'Arial, sans-serif',
                fontSize: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => document.getElementById('fileInput').click()}
            >
              Capture Photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}