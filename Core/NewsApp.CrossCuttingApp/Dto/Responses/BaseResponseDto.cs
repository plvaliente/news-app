namespace NewsApp.CrossCuttingApp.Dto
{
    public class BaseResponseDto<T_DATA>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = null;
        public T_DATA Data { get; set; } = default(T_DATA);

        public BaseResponseDto()
        {
            Success = true;
            Data = default(T_DATA);
            Message = string.Empty;
        }

        public BaseResponseDto(T_DATA data)
        {
            Success = true;
            Data = data;
            Message = string.Empty;
        }

        public BaseResponseDto(string msg): this()
        {
            Message = msg;
        }
    }
}
