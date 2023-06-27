namespace NewsApp.CrossCuttingApp.Dto
{
    public class BaseResponseDto<T_DATA>
    {
        public bool Success { get; set; } = false;
        public string Message { get; set; } = null;
        public T_DATA Data { get; set; } = default(T_DATA);
    }
}
