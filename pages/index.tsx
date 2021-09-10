import type { NextPage } from "next";
import { SearchPanel } from "../components/SearchPanel/SearchPanel";
import { Thumbnail } from "../components/Thumbnail";
import { ThumbnailGrid } from "../components/ThumbnailGrid";

const Home: NextPage = () => {
  return (
    <div>
      <SearchPanel onChange={console.log} />
      <ThumbnailGrid>
        <>
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
        </>
      </ThumbnailGrid>
    </div>
  );
};

export default Home;
