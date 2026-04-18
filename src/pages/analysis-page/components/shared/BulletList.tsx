interface BulletListProps {
  items?: string[];
  emptyText?: string;
}

const liStyle =
  "text-[clamp(14px,1.1vw,16px)] font-normal text-[#111] font-['Pretendard'] leading-[150%]";

export default function BulletList({ items, emptyText = "정보가 없습니다." }: BulletListProps) {
  return (
    <ul className="flex flex-col gap-[8px] list-disc list-outside pl-[16px] ml-[16px]">
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <li key={index} className={liStyle}>
            {item}
          </li>
        ))
      ) : (
        <li className={liStyle}>{emptyText}</li>
      )}
    </ul>
  );
}
