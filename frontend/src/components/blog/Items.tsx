import '@styles/Tiptap.css';
import { Editor } from '@tiptap/react';
import { useUploadProjectFileMutation, useUploadPostFileMutation } from '@/redux/api/storageApi';
import { ROUTES } from '@/routes/router';
interface Props {
  editor: Editor | null;
}
export namespace Items {
  export const H1 = ({ editor }: Props) => {
    return (
      <button
        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor?.isActive('heading', { level: 1 }) ? 'is-h1' : 'is-not-h1'}
      ></button>
    );
  };

  export const H2 = ({ editor }: Props) => {
    return (
      <button
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor?.isActive('heading', { level: 2 }) ? 'is-h2' : 'is-not-h2'}
      ></button>
    );
  };

  export const H3 = ({ editor }: Props) => {
    return (
      <button
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor?.isActive('heading', { level: 3 }) ? 'is-h3' : 'is-not-h3'}
      ></button>
    );
  };

  export const H4 = ({ editor }: Props) => {
    return (
      <button
        onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor?.isActive('heading', { level: 4 }) ? 'is-h4' : 'is-not-h4'}
      ></button>
    );
  };

  export const Bold = ({ editor }: Props) => {
    return (
      <button
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        className={editor?.isActive('bold') ? 'is-bold' : 'is-not-bold'}
      ></button>
    );
  };

  export const Italic = ({ editor }: Props) => {
    return (
      <button
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        className={editor?.isActive('italic') ? 'is-italic' : 'is-not-italic'}
      ></button>
    );
  };

  export const Strikethrough = ({ editor }: Props) => {
    return (
      <button
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        disabled={!editor?.can().chain().focus().toggleStrike().run()}
        className={editor?.isActive('strike') ? 'is-strike' : 'is-not-strike'}
      ></button>
    );
  };

  export const Code = ({ editor }: Props) => {
    return (
      <button
        onClick={() => editor?.chain().focus().toggleCode().run()}
        disabled={!editor?.can().chain().focus().toggleCode().run()}
        className={editor?.isActive('strike') ? 'is-code' : 'is-not-code'}
      ></button>
    );
  };

  export const CodeBlock = ({ editor }: Props) => {
    return (
      <button
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
        className={editor?.isActive('codeBlock') ? 'is-code-block' : 'is-not-code-block'}
      ></button>
    );
  };

  export const Quote = ({ editor }: Props) => {
    return (
      <button
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
        className={editor?.isActive('blockquote') ? 'is-quote' : 'is-not-quote'}
      ></button>
    );
  };

  export const AddImage = ({ editor }: Props) => {
    const [uploadProjectFile, { isLoading: isUploadingProjectFile }] = useUploadProjectFileMutation();
    const [uploadPostFile, { isLoading: isUploadingPostFile }] = useUploadPostFileMutation();
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (location.pathname.startsWith(ROUTES.PROJECT_EDIT)) {
          const { data } = await uploadProjectFile(file);
          if (data) {
            editor?.commands.setImage({ src: data.url });
          }
        } else if (location.pathname.startsWith(ROUTES.POST_EDIT)) {
          const { data } = await uploadPostFile(file);
          if (data) {
            editor?.commands.setImage({ src: data.url });
          }
        }
      }
    };

    return (
      <>
        <label htmlFor='img-upload' className='is-image'></label>
        <input
          id='img-upload'
          disabled={isUploadingProjectFile || isUploadingPostFile}
          className='hidden'
          type='file'
          onChange={handleFileChange}
          accept='image/*'
        />
      </>
    );
  };
}

export default Items;
