import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SearchPanel } from "./SearchPanel";

export default {
  title: "SearchPanel",
  component: SearchPanel,
} as ComponentMeta<typeof SearchPanel>;

const Template: ComponentStory<typeof SearchPanel> = (args) => (
  <SearchPanel {...args} />
);

export const Primary = Template.bind({});
Primary.args = { onChange: console.log };
