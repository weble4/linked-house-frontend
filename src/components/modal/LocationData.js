export function LocationData() {
    return [
        { filterKeyword: "서울" },
        { filterKeyword: "세종" },
        { filterKeyword: "인천" },
        { filterKeyword: "대전" },
        { filterKeyword: "광주" },
        { filterKeyword: "부산" },
        { filterKeyword: "대구" },
        { filterKeyword: "울산" },
        { filterKeyword: "경기도" },
        { filterKeyword: "강원도" },
        { filterKeyword: "충청도" },
        { filterKeyword: "전라도" },
        { filterKeyword: "경상도" },
        { filterKeyword: "제주도" },
    ];
}

export function renderLocation(state, val) {
    return state.filterKeyword.toLowerCase().indexOf(val.toLowerCase()) !== -1;
}
