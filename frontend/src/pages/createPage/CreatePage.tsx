import type React from "react";
import "./createPage.css";

const CreatePage = (): React.ReactElement => {
    return (
        <div className="create">
            <div className="top">
                <h1>Create Pin</h1>
                <button>Publish</button>
            </div>
            <div className="bottom">
                <div className="upload">
                    <div className="uploadTitle">
                        <img src="/general/upload.svg" alt="" />
                        <span>Choose a file</span>
                    </div>
                    <div className="uploadInfo">
                        We recommend using high quality .jpg files less than 20 MB or
                        .mp4 files less than 200 MB.
                    </div>
                </div>
                <form className="createForm">
                    <div className="formItem">
                        <label htmlFor="title">Title</label>
                        <input type="text"
                            placeholder="Add a title"
                            id="title"
                            name="title" />
                    </div>
                    <div className="formItem">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            rows={6}
                            placeholder="Add a detailed description"
                            id="description"
                            name="description" />
                    </div>
                    <div className="formItem">
                        <label htmlFor="link">Link</label>
                        <input type="text"
                            placeholder="Add a link"
                            id="link"
                            name="link" />
                    </div>
                    <div className="formItem">
                        <label htmlFor="board">Board</label>
                        <select name="board" id="board">
                            <option value="">Choose a board</option>
                            <option value="1">Board 1</option>
                            <option value="2">Board 2</option>
                            <option value="3">Board 3</option>
                        </select>
                    </div>
                    <div className="formItem">
                        <label htmlFor="tags">Tagged topics</label>
                        <input type="text" placeholder="Add tags" name="tags" id="tags" />
                        <small>Don&apos;t worry, people won&apos;t see your tags</small>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreatePage;