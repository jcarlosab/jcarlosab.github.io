import GameBrowser from '@/app/ui/GameBrowser';
import { fetchGameData } from '@/app/lib/data';

export default async function Page() {
    const platforms = await fetchGameData();

    return <GameBrowser platforms={platforms} />;
}
