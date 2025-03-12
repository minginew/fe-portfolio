import { useEffect, useState } from 'react';

interface Props {
  intialState: string[];
  placeholder: string;
  onTagBlur(data: string[]): void;
}

const Tag = ({ intialState, placeholder, onTagBlur }: Props) => {
  const [tagName, setTagName] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);

  useEffect(() => {
    if (intialState.length == 0) return;
    setTagList([...intialState]);
  }, [intialState]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length <= 10) setTagName(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key == 'Enter' && tagName) {
      if (tagList.length >= 5) {
        setTagName('');
        return;
      }

      if (tagList.includes(`#${tagName}`)) {
        setTagName('');
        return;
      }

      setTagName('');
      setTagList([...tagList, `#${tagName}`]);
    } else if (!tagName && e.key == 'Backspace') {
      if (tagList.length > 0) {
        const newTagData = tagList.slice(0, -1);
        setTagList(newTagData);
      }
    }
  };

  const handleDeleteTag = (index: number) => {
    const newTagData = [...tagList];
    newTagData.splice(index, 1);
    setTagList(newTagData);
  };

  return (
    <div className='w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
      <div className='flex h-10 w-full flex-row items-center whitespace-nowrap'>
        {tagList.map((tag, index) => (
          <div
            key={index}
            className='text-main-blue mr-3 p-1 font-light hover:cursor-pointer'
            onClick={() => handleDeleteTag(index)}
          >
            {tag}
          </div>
        ))}
        <input
          type='text'
          value={tagName}
          className={`h-7 w-48 focus:outline-none ${tagList.length === 5 ? 'placeholder-red-400' : ''}`}
          placeholder={`${placeholder} (${tagList.length}/5)`}
          onChange={handleOnChange}
          onKeyDown={(e) => {
            handleOnKeyDown(e);
          }}
          onBlur={() => {
            onTagBlur(tagList);
          }}
        />
      </div>
    </div>
  );
};

export default Tag;
