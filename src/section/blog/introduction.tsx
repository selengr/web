import styles from "@/section/blog/blog.module.css";
import { fDate, fToNow } from "@/utils/formatTime";

const Introduction = ({ blog, user }: { blog: any, user: any }) => {
  console.log('blog0000 :>> ', blog.createdAt);
  return (

    <div className={styles["post-blog"]}>
      <div className={styles["post-blog-property-map-opt"]}>
        {[1, 2, 3, 4, 5, 6, 7]?.map((it: any) => (
          <>
            <span>{it}</span>
          </>
        ))}
      </div>

      <span className={styles["post-blog-property-date"]}>
        {fToNow(blog?.createdAt.toString())}
      </span>
      <span className={styles["post-blog-property-name"]}>{user.name} {user.family}</span>

      <hr className={styles["post-blog-propert-underLine"]} />

    </div>
  );
};

export default Introduction;
