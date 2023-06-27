using AutoMapper;
using NewsApp.CrossCuttingApp.Dto;
using NewsApp.CrossCuttingApp.Entities;

namespace NewsApp.CrossCuttingApp.Mapper
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<News,NewsDto>().ReverseMap();

            CreateMap<NewsResponse, NewsResponseDto>()
                .ForMember(dest => dest.Data, opt => opt.MapFrom(src => src.News))
                .ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Error));
        }
    }
}
