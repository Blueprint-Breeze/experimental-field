import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ol>
        <li>
          <Link href={"/example/drag-the-target-to-the-target-area"}>- Drag the target to the target area</Link>
        </li>
        <li>
          <Link href={"/example/drag-the-target-to-the-target-area/with-animation"}>- Drag the target to the target area with animation</Link>
        </li>
      </ol>
    </main>
  );
}
