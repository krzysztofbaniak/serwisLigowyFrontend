import Image from "next/image";
import {ComponentProps} from "react";

export default function Avatar(props: ComponentProps<typeof Image>) {

    return (
       <>
           {props.src ? (
               <Image className={props.className} src={props.src} width={props.width} height={props.height} alt={props.alt || ''}/>
           ) : (
               <Image className={props.className} src={'/uploads/image_Holder_ecb8c9d78b.png'} width={props.width || 120} height={props.height || 120} alt={'Logo'}/>
           )}
       </>
    )
}