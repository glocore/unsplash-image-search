import { Box } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { SearchPanel } from "../components/SearchPanel/SearchPanel";
import { Thumbnail } from "../components/Thumbnail";
import { ThumbnailGrid } from "../components/ThumbnailGrid";

const Home: NextPage = () => {
  return (
    <Box mr={8} ml={8} minH="100vh">
      <SearchPanel onChange={console.log} />
      <ThumbnailGrid>
        <>
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=80&w=1080"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=80&w=1080"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=80&w=1080"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=80&w=1080"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=80&w=1080"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=80&w=1080"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=80&w=1080"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
          <Thumbnail
            imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=80&w=1080"
            blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
            height={300}
            width="100%"
            altDescription="LEGO Star Wars toy"
          />
        </>
      </ThumbnailGrid>
    </Box>
  );
};

export default Home;
