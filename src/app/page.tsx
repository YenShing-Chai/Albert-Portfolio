import { GameHome } from "@/components/game/game-home";
import { JsonLd } from "@/components/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd />
      <GameHome />
    </>
  );
}
