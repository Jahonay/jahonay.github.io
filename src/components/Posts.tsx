
interface WPPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: { "wp:featuredmedia"?: Array<{ source_url: string }> };
}

function Posts({ posts, blogVisible }: { posts: WPPost[]; blogVisible: boolean }) {
    return(
        <div className="blog__cards">
            {posts.map((post, i) => {
                const imgUrl  = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 120) + "…";
                const date    = new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric", month: "short", day: "numeric",
                });
                return (
                <a
                    key={post.id}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`blog-card ${blogVisible ? "blog-card--visible" : ""}`}
                    style={{ transitionDelay: `${i * 0.1}s` }}
                >
                    {imgUrl && (
                    <div className="blog-card__image-wrap">
                        <img src={imgUrl} alt="" className="blog-card__image" />
                    </div>
                    )}
                    <div className="blog-card__body">
                    <p className="blog-card__date">{date}</p>
                    <h3
                        className="blog-card__title"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className="blog-card__excerpt">{excerpt}</p>
                    </div>
                </a>
                );
            })}
        </div>
    );

}

export default Posts;