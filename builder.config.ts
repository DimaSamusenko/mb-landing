import { Builder, withChildren } from '@builder.io/react'
import dynamic from 'next/dynamic'
import AnimationChip from "@/components/animation-chip";
import ModalText from "@/components/modal-text";

const CodeWithBuilderChildren = withChildren(AnimationChip)
const ModalWithBuilderChildren = withChildren(ModalText)

Builder.registerComponent(CodeWithBuilderChildren, {
    name: 'Animation Chip',
    defaultChildren: [
        {
            '@type': '@builder.io/sdk:Element',
            component: { name: 'Text', options: { text: 'I am child text block!' } }
        }
    ]
})

Builder.registerComponent(ModalWithBuilderChildren, {
    name: 'Modal with text',
    defaultChildren: [
        {
            '@type': '@builder.io/sdk:Element',
            component: { name: 'Text', options: { text: 'I am child text block!' } }
        }
    ]
})
