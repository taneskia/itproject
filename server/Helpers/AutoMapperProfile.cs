using AutoMapper;
using server.Entities;
using server.Models;
using server.Models.Accounts;

namespace server.Helpers
{
    public class AutoMapperProfile : Profile
    {
        // mappings between model and entity objects
        public AutoMapperProfile()
        {
            CreateMap<Account, AccountResponse>();

            CreateMap<Account, AuthenticateResponse>();

            CreateMap<RegisterRequest, Account>();

            CreateMap<RegisterRequest, Buyer>();
            CreateMap<RegisterRequest, Market>();
            CreateMap<RegisterRequest, Freelancer>();
        }
    }
}