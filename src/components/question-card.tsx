import { useEffect, useRef, useState } from "react";
import { useConfig } from "../config-storage";

// ✅ Opción B (si NO lo ponés en public):
// import SEALIONS2 from "../components/SEALIONS2.mp4";

interface QuestionCardProps {
  openQuest: boolean;
  AcceptQuest?: () => void;
}

type Phase = "question" | "video" | "after";

function QuestionCard({ openQuest, AcceptQuest }: QuestionCardProps) {
  const { config } = useConfig();

  const [phase, setPhase] = useState<Phase>("question");

  const [noCount, setNoCount] = useState(0);
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const noBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (openQuest) {
      setPhase("question");
      setNoCount(0);
      setHasMovedNo(false);
      setNoPos({ x: 0, y: 0 });
    }
  }, [openQuest]);

  const randomizeNoButton = () => {
    const btn = noBtnRef.current;

    const btnW = btn?.offsetWidth ?? 160;
    const btnH = btn?.offsetHeight ?? 40;

    const padding = 12;
    const maxX = window.innerWidth - btnW - padding;
    const maxY = window.innerHeight - btnH - padding;

    const x = Math.max(padding, Math.random() * maxX);
    const y = Math.max(padding, Math.random() * maxY);

    setNoPos({ x, y });
  };

  const handleNoClick = () => {
    setNoCount((prev) => {
      const next = prev + 1;

      if (next >= 5) {
        setPhase("video"); 
        return next;
      }

      if (!hasMovedNo) setHasMovedNo(true);

      randomizeNoButton();
      return next;
    });
  };

  // ✅ Imagen normal vs imagen "after" (Snoopy cambia)
  const questionImg = config!.imagenPregunta;
  const afterImg =
    (config as any)?.imagenSnoopyAfter ?? "src\components\LIONS3.png"; // poné tu ruta real

  // ✅ Texto opcional para after
  const afterText = (config as any)?.preguntaAfter ?? "Ok… solo te queda decir que sí 😈";

  return (
    <>
      {/* ====== CARD PRINCIPAL (question/after) ====== */}
      {(phase === "question" || phase === "after") && (
        <div
          className={`bg-gray-600/30 border flex gap-4 flex-col border-white/10 rounded-2xl p-4 transition-all duration-700 ${
            openQuest ? "visible" : "invisible"
          }`}
        >
          <h2 className="text-4xl font-bold text-center text-red-700">
            {phase === "after" ? afterText : config!.pregunta}
          </h2>

          <img
            src={phase === "after" ? afterImg : questionImg}
            alt="archivo pregunta"
            className="self-center object-cover w-52 h-52 rounded-2xl"
          />

          <div className="flex items-center gap-4 justify-evenly flex-col md:flex-row">
            {/* ✅ SI normal vs SI gigante */}
            <button
              type="button"
              onClick={AcceptQuest}
              className={
                phase === "after"
                  ? "w-full md:w-[28rem] text-3xl font-extrabold px-8 py-6 border rounded-2xl bg-green-500/60 hover:bg-green-500/80 transition"
                  : "w-40 px-4 py-1 border rounded bg-green-500/50 hover:bg-green-500/70"
              }
            >
              {config!.botonAceptar}
            </button>

            {/* ✅ NO SOLO EXISTE EN QUESTION */}
            {phase === "question" && !hasMovedNo && (
              <button
                ref={noBtnRef}
                type="button"
                onClick={handleNoClick}
                className="w-40 px-4 py-1 border rounded bg-red-500/50 hover:bg-red-500/70"
              >
                {config!.botonRechazar}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ====== NO FLOTANTE (solo question, después del primer click) ====== */}
      {openQuest && phase === "question" && hasMovedNo && (
        <button
          ref={noBtnRef}
          type="button"
          onClick={handleNoClick}
          style={{
            position: "fixed",
            left: noPos.x,
            top: noPos.y,
            zIndex: 9999,
          }}
          className="w-40 px-4 py-1 border rounded bg-red-500/50 hover:bg-red-500/70"
        >
          {config!.botonRechazar}
        </button>
      )}

      {/* ====== VIDEO (fase video) ====== */}
      {openQuest && phase === "video" && (
        <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4 max-w-xl w-full">
            <h3 className="text-center text-2xl font-bold text-white mb-4">
              Ya dijiste que no 5 veces 😭
            </h3>

            <video
              autoPlay
              controls
              className="w-full rounded-xl"
              // ✅ Opción A (si lo pusiste en public/):
              src="src\components\SEALIONS2.mp4"
              
              onEnded={() => {
                // ✅ cuando termina, regresa a opciones pero SIN NO y con cambios
                setPhase("after");
              }}
            />

            {/* opcional: si querés que NO puedan saltarse el final, quitá este botón */}
            <button
              className="mt-4 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 border text-white"
              onClick={() => setPhase("after")}
            >
              Saltar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionCard;
