class Userservice {
  static async checkAndCreate(data: Record<string, unknown>) {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    return resData;
  }
}

export default Userservice;
