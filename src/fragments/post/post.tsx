import ClassicBox from "@/components/classicBox";
import Image from "next/image";
import Markdown from "react-markdown";
import styles from './post.module.scss'

export default function Post({post}) {
    return (
        <ClassicBox>
            <div className={styles.post}>
                {post ? (
                    <div>
                        {post.image && (
                            <div className={styles.post__imageHolder}>
                                <Image className={styles.post__image} src={post.image.url} alt={post.image.alternativeText || post.title} width={696} height={522} />
                            </div>
                        )}
                        <div className={styles.post__content}>
                            <h1 className={styles.post__headline}>{post.title}</h1>
                            <p className={styles.post__author}>Autor: Tutaj będzie autor</p>
                            <Markdown className={styles.post__markdown}>{post.content}</Markdown>
                        </div>
                    </div>
                ) : (
                    <p className={styles.post__empty}>Ładowanie...</p>
                )}
            </div>
        </ClassicBox>
    )
}