import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { describe, expect } from "vitest";

describe("<BlogForm />", () => {
  test("Check that create blog receive data correctly", async () => {
    const createNewBlog = vi.fn();
    const user = userEvent.setup();

    const blogToAdd = {
      title: "ejemplo",
      author: "test",
      url: "ejemplo.test.cl",
    };

    render(<BlogForm createNewBlog={createNewBlog} />);
    const inputTitle = screen.getByTestId("input title");
    const inputAuthor = screen.getByTestId("input author");
    const inputUrl = screen.getByTestId("input url");
    const sendButton = screen.getByText("create");

    await user.type(inputTitle, blogToAdd.title);
    await user.type(inputAuthor, blogToAdd.author);
    await user.type(inputUrl, blogToAdd.url);
    await user.click(sendButton);

    expect(createNewBlog.mock.calls).toHaveLength(1);
    expect(createNewBlog.mock.calls[0][0]).toStrictEqual(blogToAdd);
  });
});
