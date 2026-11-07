export default function LevelNode() {
  const levels = [
    { id: 1, title: "level 1", subtitle: "progress" },
    { id: 2, title: "level 2", subtitle: "progress" },
    { id: 3, title: "level 3", subtitle: "progress" },
    { id: 4, title: "level 4", subtitle: "progress" },
    { id: 5, title: "level 5", subtitle: "progress" },
    { id: 6, title: "level 6", subtitle: "progress" },
    { id: 7, title: "level 7", subtitle: "progress" },
  ];

  // التناوب بين اليسار واليمين بمسافة متناسقة تعطي زاوية مائلة واضحة وتبقى داخل شاشة الهاتف
  const pattern = [-60, 60];

  const getX = (i: number) => {
    return pattern[i % pattern.length];
  };

  return (
    <div className="py-8 px-4 w-full flex flex-col items-center gap-2 overflow-x-hidden scroll-smooth">
      {levels.map((item, index) => {
        const currentX = getX(index);
        const nextX = getX(index + 1);
        const deltaX = nextX - currentX;
        const deltaY = 216;
        const isLast = index === levels.length - 1;

        return (
          <div
            key={index}
            className="level-node"
            style={{ transform: `translateX(${currentX}px)` }}
          >
            <div className="circle">
              <div className="circle-content text-center select-none">
                <h1>{item.title}</h1>
                <p>{item.subtitle}</p>
              </div>
            </div>

            {!isLast && (
              <div className="line">
                <svg className="overflow-visible w-2 h-2">
                  <path
                    d={`M 0 0 L ${deltaX} ${deltaY}`}
                    fill="none"
                    stroke="#0D9488"
                    strokeWidth="4"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}