import Atropos from "atropos/react";
import { useConfig } from "../config-storage";

interface HojaProps {
  closeHoja: () => void;
}

function Hoja({ closeHoja }: HojaProps) {
  const { config } = useConfig();

  return (
    <Atropos
      rotateXMax={10}
      rotateYMax={10}
      highlight={false}
      rotateXInvert={false}
      rotateYInvert={false}
      shadow={false}
      className="absolute z-50 w-auto h-full flex justify-center items-center"
    >
      <div className="flex self-center w-3xl h-full">
        <article className="flex flex-col gap-2 h-full p-4 bg-[#fdf9e4] border-black/30 rounded-lg border-2 top-5 bottom-10 w-6xl">
          <div
            className="h-full overflow-y-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            <p className="px-10 py-4 text-justify text-md font-semibold whitespace-pre-line">
{`Hola Andrea,

Durante todos estos meses juntos jamás imaginé lo profundamente maravillosa que eras.
Lo que comenzó con simples miradas entre pedidos, números e inventarios, se transformó poco a poco en algo que hoy llena mi corazón. Jamás pensé que entre rutinas y conversaciones cotidianas terminaría escribiendo una carta para usted, pero aquí estoy… dejándome llevar por lo que siento.

Disculpe si esta forma de expresarme es un poco nerd; así soy yo.
Pero créame que cada palabra está escrita con el corazón en las manos y con la certeza de que usted merece lo más sincero de mí.

Usted me ha ayudado de una manera extraordinaria.
Siempre estuvo ahí, ayudándome a encontrar respuestas cuando todo parecía confuso, brindándome apoyo con una madurez y una paciencia que admiro profundamente.
Me vio en mis peores momentos, cuando no tenía claras ni mis propias emociones, y aun así nunca se apartó.
Eso habla de la hermosa persona que es, de su nobleza y de su luz.

Sin darme cuenta, su presencia se volvió calma, su voz se volvió refugio y su sonrisa, un motivo.
Por todo esto, hoy quiero ser valiente y honesto.

Mediante esta carta le declaro mi amor.
Un amor sincero, profundo y real.
El amor que siento por Andrea.

Gracias por existir en mi vida.
Gracias por aceptar ser mi San Valentín.
Y gracias por ser usted.`}
            </p>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="p-2 rounded border text-amber-500 border-amber-200 bg-amber-100/30 hover:bg-amber-100/30"
              onClick={closeHoja}
            >
              Guardar Carta
            </button>
            <small className="font-bold text-pretty">
              Te quiere EL ROROPRIRRORO <br />
            </small>
          </div>
        </article>
      </div>
    </Atropos>
  );
}

export default Hoja;
