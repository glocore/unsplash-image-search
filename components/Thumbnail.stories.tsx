import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Thumbnail } from "./Thumbnail";

export default {
  title: "Thumbnail",
  component: Thumbnail,
} as ComponentMeta<typeof Thumbnail>;

const Template: ComponentStory<typeof Thumbnail> = (args) => (
  <Thumbnail {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  imageUrl:
    "https://images.unsplash.com/photo-1518331539918-7a2dbf839306?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxODk0NjZ8MHwxfGNvbGxlY3Rpb258MXwyNDIzNTY5fHx8fHwyfHwxNjMxMTcyMzgz&ixlib=rb-1.2.1&q=85",
  blurhash: "L77m$p9#ENxWE3xWs:WX0%-TxYNH",
  height: 250,
  width: 500,
  altDescription: "LEGO Star Wars toy",
};
