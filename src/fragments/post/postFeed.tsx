import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import PostEntry from "@/fragments/post/postEntry";
import styles from './postFeed.module.scss'

export default function PostFeed({posts, placeholder = 'Ładowanie...', redirectLink = '', loadFunction = () => {}}) {

    return (
        <ClassicBox redirect={redirectLink} onClick={loadFunction} condition={posts && posts.length > 0}>
            <ClassicHeader><h1>Najnowsze aktualności</h1></ClassicHeader>
            <div className={styles.postFeed}>
                {posts && posts.length > 0 ? posts.map(post => {
                    return (
                        <PostEntry key={post.id} post={post} />
                    )
                }) : (
                    <p className={styles.postFeed__empty}>{placeholder}</p>
                )}
            </div>
        </ClassicBox>
    )
}