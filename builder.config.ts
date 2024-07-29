import { Builder, withChildren } from '@builder.io/react'
import dynamic from 'next/dynamic'
import AnimationChip from "@/components/animation-chip";
import ModalText from "@/components/modal-text";
import CookiePolicy from "@/components/cookie-policy/cookie-policy";
import CopyPromocode from "@/components/copy-promocode/copy-promocode";
import CookieBanner from "@/components/cookie-banner/cookie-banner";

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

/*Builder.registerComponent(withChildren(CookiePolicy), {
    name: 'Cookie Policy',
    defaultChildren: [
        {
            '@type': '@builder.io/sdk:Element',
            component: { name: 'Text', options: { text: 'I am child text block!' } }
        }
    ]
})*/

Builder.registerComponent(CopyPromocode, {
    name: 'Copy Promocode',
    inputs: [
        { name: 'title', type: 'text' },
        { name: 'promocode', type: 'text' },
        { name: 'copied', type: 'text', defaultValue: 'Copy the promo code' },
        { name: 'helpText', type: 'text', defaultValue: 'Promo code was copied successfully!' },
    ],
})

Builder.registerComponent(withChildren(CookieBanner), {
    name: 'Cookie banner',
    inputs: [
        { name: 'buttonLabel', type: 'text' },
    ],
    defaultChildren: [
        {
            '@type': '@builder.io/sdk:Element',
            component: { name: 'Text', options: { text: 'I am child text block!' } }
        }
    ]
})
