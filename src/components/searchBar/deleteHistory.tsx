const DeleteHistory = (idx: string) => {
    const getHistory = JSON.parse(localStorage.getItem("recentSearch") || "[]");
    const updatedHistory = getHistory.filter((item: string) => item !== idx);
    localStorage.setItem("recentSearch", JSON.stringify(updatedHistory));
    return updatedHistory
}

export default DeleteHistory