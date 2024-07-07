import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { beforeEach, describe, expect } from "vitest";

describe("<Blog />", () => {
  let container;
  const blog = {
    title: "Blog for testing",
    author: "test",
    url: "www.blog.test.cl",
    likes: 2,
    user: {
      username: "tester",
    },
  };
  const username = "tester";
  const updateLikes = vi.fn();
  const removeBlog = vi.fn();

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        username={username}
        addLike={updateLikes}
        removeBlog={removeBlog}
      />
    ).container;
  });

  test("render blog default", () => {
    const div = container.querySelector(".blog_header");

    //screen.debug(div)

    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`);
  });

  test("render blog when is click in show", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    const div = container.querySelector(".blog_show");

    expect(div).toHaveTextContent(`${blog.url}`);
    expect(div).toHaveTextContent(`${blog.likes}`);
  });

  test("Ensure that update likes is called twice", async () => {
    const user = userEvent.setup();

    const addLikeButton = screen.getByText("like");
    await user.dblClick(addLikeButton);

    expect(updateLikes.mock.calls).toHaveLength(2);
  });
});
