import styles from "./postEntry.module.scss"
import Image from "next/image";
import Link from "next/link";

export default function PostEntry({post}) {

    return (
        <Link className={styles.postEntry} href={`/aktualnosci/${post.slug}`}>
            <article className={`${styles.postEntry__wrapper} ${!post.image ? styles.noImage : null}`}>
                {post.image ? (
                    <Image className={styles.postEntry__image} src={post.image.formats.small.url} width={160}
                           height={120} alt={post.image.formats.thumbnail.name}/>
                ) : null}
                <h2 className={styles.postEntry__title}>{post.title}</h2>
                <p className={styles.postEntry__lead}>{post.lead}</p>
            </article>
        </Link>
    )
}