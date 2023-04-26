import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const addPost = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    axios
      .post(`${apiUrl}/api/post/create`, { userId: userId, content: content })
      .then(async (res) => {
        await getPosts();
        alert(res.data.message);
        setContent("");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const getPosts = async () => {
    axios.get(`${apiUrl}/api/posts`).then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleUpdateButtonPressed = (post) => {
    setSelectedPost(post);
    setShowUpdateModal(true);
  };

  const handleModalUpdateButtonPressed = () => {
    axios
      .post(`${apiUrl}/api/post/update`, {
        id: selectedPost._id,
        content: selectedPost.content,
      })
      .then(async (res) => {
        await getPosts();
        alert(res.data.message);
        setShowUpdateModal(false);
        setSelectedPost({});
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const updateModal = () => {
    return (
      <div
        className="modal d-flex"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Post
              </h5>
            </div>
            <div className="modal-body m-4 d-flex flex-column">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                rows="5"
                value={selectedPost.content}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, content: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger "
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalUpdateButtonPressed}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleDeleteButtonPressed = (post) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const handleModalDeleteButtonPressed = () => {
    axios
      .delete(`${apiUrl}/api/post/delete`, { params: { id: selectedPost._id } })
      .then(async (res) => {
        await getPosts();
        alert(res.data.message);
        setShowDeleteModal(false);
        setSelectedPost({});
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const deleteModal = () => {
    return (
      <div
        className="modal d-flex"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Post
              </h5>
            </div>
            <div className="modal-body m-4">
              Are you sure you want to delete this post?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger "
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalDeleteButtonPressed}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <form autoComplete="off" onSubmit={addPost}>
              <div className="form-group">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="form-control"
                  rows="5"
                  placeholder="Write something.."
                ></textarea>
              </div>
              <div className="form-group mt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                >
                  Share
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr />
        {posts.map((post, index) => {
          return (
            <div key={index} className="card mt-2">
              <div className="card-body">
                <div className="d-flex flex-row gap-2">
                  <img
                    src={apiUrl + "/" + post.users[0].avatar.path}
                    alt=""
                    style={{
                      width: "35px",
                      borderRadius: "50px",
                      height: "35px",
                    }}
                  />
                  <h5 className="pt-1">{post.users[0].name}</h5>
                  <div className="ms-auto">
                    <button
                      className="btn btn-primary shadow-none me-1"
                      onClick={() => handleUpdateButtonPressed(post)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pen"
                        viewBox="0 0 16 16"
                      >
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                      </svg>
                    </button>
                    <button
                      className="btn btn-danger shadow-none"
                      onClick={() => handleDeleteButtonPressed(post)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p>{post.content}</p>
                <h6 className="text-end">
                  {new Date(post.createdDate).toLocaleString()}
                </h6>
              </div>
            </div>
          );
        })}
      </div>
      {showDeleteModal && deleteModal()}
      {showUpdateModal && updateModal()}
    </div>
  );
}

export default Home;
