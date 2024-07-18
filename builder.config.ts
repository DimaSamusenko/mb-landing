import { Builder, withChildren } from '@builder.io/react'
import dynamic from 'next/dynamic'
import AnimationChip from "@/components/animation-chip";
import ModalText from "@/components/modal-text";
import CookiePolicy from "@/components/cookie-policy/cookie-policy";

Builder.registerComponent(withChildren(AnimationChip), {
    name: 'Animation Chip',
    defaultChildren: [
        {
            '@type': '@builder.io/sdk:Element',
            component: { name: 'Text', options: { text: 'I am child text block!' } }
        }
    ]
})

Builder.registerComponent(withChildren(ModalText), {
    name: 'Modal with text',
    defaultChildren: [
        {
            '@type': '@builder.io/sdk:Element',
            component: { name: 'Text', options: { text: 'I am child text block!' } }
        }
    ]
})

Builder.registerComponent(withChildren(CookiePolicy), {
    name: 'Cookie Policy',
    defaultChildren: [
        {
            '@type': '@builder.io/sdk:Element',
            component: { name: 'Text', options: { text: 'I am child text block!' } }
        }
    ]
})
