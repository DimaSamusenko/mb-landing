import { Builder, withChildren } from '@builder.io/react'
import dynamic from 'next/dynamic'
import AnimationChip from "@/components/animation-chip";

const CodeWithBuilderChildren = withChildren(AnimationChip)

Builder.registerComponent(CodeWithBuilderChildren, {
    name: 'Animation Chip',
    defaultChildren: [
        {
            '@type': '@builder.io/sdk:Element',
            component: { name: 'Text', options: { text: 'I am child text block!' } }
        }
    ]
})
