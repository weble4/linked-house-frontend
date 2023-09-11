import React, { useEffect, useState } from "react";

const AutoComplete = ({ value, items, getItemValue, shouldItemRender, renderMenu, renderItem, onChange, onSelect }) => {
    const [activeItem, setActiveItem] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        // 입력된 검색어에 맞는 항목 필터링
        const filtered = items.filter((item) => shouldItemRender(item, value));
        setFilteredItems(filtered);
    }, [items, shouldItemRender, value]);

    const handleItemClick = (item) => {
        onSelect(item);
        setActiveItem(null);
    };

    return (
        <div>
            <input type="text" id="filterKeyword" value={value} onChange={(e) => onChange(e, e.target.value)} placeholder="지역 검색" />
            {activeItem && (
                <div className="dropdown">
                    {renderMenu(
                        filteredItems.map((item) => (
                            <div
                                key={getItemValue(item)}
                                className={`item ${activeItem === item ? "selected-item" : ""}`}
                                onClick={() => handleItemClick(item)}
                            >
                                {renderItem(item, activeItem === item)}
                            </div>
                        )),
                    )}
                </div>
            )}
        </div>
    );
};

export default AutoComplete;
