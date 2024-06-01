import logo from './logo.svg';
import './App.css';
import { useQuery ,gql } from '@apollo/client';

const GET_BLOGS = gql`
  query GetBlogs {
    getBlogs {
      id
      title
      body
      status
      author {
        id
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_BLOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.getBlogs.map(blog => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.body}</p>
          <p>Status: {blog.status ? 'Published' : 'Draft'}</p>
          <p>Author: {blog.author.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
