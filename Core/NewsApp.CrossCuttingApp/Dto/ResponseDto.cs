namespace NewsApp.CrossCuttingApp.Dto
{
    public class ResponseDto<T_DATA>
    {
        public string Message { get; set; } = null;
        public T_DATA Data { get; set; } = default(T_DATA);

        public ResponseDto(T_DATA data)
        {
            Data = data;
            Message = string.Empty;
        }

        public ResponseDto(string msg)
        {
            Data = default(T_DATA);
            Message = msg;
        }

    }
}
