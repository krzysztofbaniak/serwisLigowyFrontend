import styles from "./postFeed.module.scss";

export default async function PostFeed() {

    const postsData = await fetch('http://localhost:1337/api/posts')
    const posts = await postsData.json()

    return (
        <div className={styles.postFeed}>
            {posts.data.map(post => (
                <article key={post.id} className={styles.postFeed__article}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </article>
            ))}
        </div>
    )
}