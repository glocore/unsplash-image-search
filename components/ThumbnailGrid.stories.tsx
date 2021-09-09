import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThumbnailGrid } from "./ThumbnailGrid";
import { Thumbnail } from "./Thumbnail";

export default {
  title: "ThumbnailGrid",
  component: ThumbnailGrid,
} as ComponentMeta<typeof ThumbnailGrid>;

const Template: ComponentStory<typeof ThumbnailGrid> = (args) => (
  <ThumbnailGrid {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <>
      <Thumbnail
        imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
        blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
        height={200}
        width="100%"
        altDescription="LEGO Star Wars toy"
      />
      <Thumbnail
        imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
        blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
        height={200}
        width="100%"
        altDescription="LEGO Star Wars toy"
      />
      <Thumbnail
        imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
        blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
        height={200}
        width="100%"
        altDescription="LEGO Star Wars toy"
      />
      <Thumbnail
        imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
        blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
        height={200}
        width="100%"
        altDescription="LEGO Star Wars toy"
      />
      <Thumbnail
        imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
        blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
        height={200}
        width="100%"
        altDescription="LEGO Star Wars toy"
      />
      <Thumbnail
        imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
        blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
        height={200}
        width="100%"
        altDescription="LEGO Star Wars toy"
      />
      <Thumbnail
        imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
        blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
        height={200}
        width="100%"
        altDescription="LEGO Star Wars toy"
      />
      <Thumbnail
        imageUrl="https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85"
        blurhash="L77m$p9#ENxWE3xWs:WX0%-TxYNH"
        height={200}
        width="100%"
        altDescription="LEGO Star Wars toy"
      />
    </>
  ),
};
