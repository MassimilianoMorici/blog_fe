import React, { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import AxiosClient from "../../../client/client";
import "./style.css";
import BlogItem from "../blog-item/BlogItem";
import useSession from "../../../hooks/useSession";
const client = new AxiosClient()

const BlogList = () => {


  const session = useSession()
  console.log(session);

  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState([])

  const getPosts = async () => {

    try {
      const response = await client.get(`/blogPosts?page=${currentPage}`)
      setPosts(response)

    } catch (e) {
      console.log(e);
    }
  };



  const handlePagination = (value) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    getPosts()
  }, [currentPage]);



  return (

    <div>
      <div className="d-flex flex-wrap justify-content-evenly my-5">
        {posts && posts.blogPosts?.map((post) => {
          console.log(post._id);
          return (
            <BlogItem key={post._id}
              _id={post._id}
              title={post.title}
              category={post.category}
              cover={post.cover}
              authorNome={post.author?.nome}
              authorCognome={post.author?.cognome}
              authorAvatar={post.author?.avatar}
              content={post.content}
            />
          )
        })}
      </div>
      <div>
        <ResponsivePagination
          current={currentPage}
          total={posts && posts.totalPages}
          onPageChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default BlogList;
