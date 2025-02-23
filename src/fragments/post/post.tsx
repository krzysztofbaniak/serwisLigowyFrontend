import ClassicBox from "@/components/classicBox";
import Image from "next/image";
import Markdown from "react-markdown";
import styles from './post.module.scss'
import ClassicHeader from "@/components/classicHeader";
import Link from "next/link";

export default function Post({post}) {
    return (
        <ClassicBox>
            <ClassicHeader>
                <Link className={styles.returnLink} href={'/aktualnosci'}>◀&nbsp;Powrót</Link>
                <p>Aktualność</p>
            </ClassicHeader>
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