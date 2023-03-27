import { Component } from "react";

import "./styles.css";

import { Button } from "../../components/Button";
import { Posts } from "../../components/Posts";
import { TextInput } from "../../components/TextInput";
import { loadPosts } from "../../utils/load-posts";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 45,
    searchValue: "",
  };
  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const photosAndPhotos = await loadPosts();
    this.setState({
      posts: photosAndPhotos.slice(page, postsPerPage),
      allPosts: photosAndPhotos,
    });
  };
  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  componentDidUpdate() {}
  componentWillUnmount() {}

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;
    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Search Value: {searchValue}</h1>}
          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && <p> Não existem posts :/</p>}
        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load More Posts"
              onclick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
