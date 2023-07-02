using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Models.Actif;
using AM_PME_ASP_API.Models.Produit;
using AM_PME_ASP_API.Models.Emplacement;
using AM_PME_ASP_API.Models.Employe;
using AM_PME_ASP_API.Models.Fournisseur;
using AM_PME_ASP_API.Models.Role;
using AM_PME_ASP_API.Models.User;
using AutoMapper;

namespace AM_PME_ASP_API.Helpers
{
    public class AutoMapperInitializer : Profile
    {
        public AutoMapperInitializer()
        {
            CreateMappingsForActifs();
            CreateMappingsForProduits();
            CreateMappingsForEmplacements();
            CreateMappingsForEmployes();
            CreateMappingsForFournisseurs();

            CreateMappingsForUsers();
            CreateMappingsForRoles();
        }

        private void CreateMappingsForActifs()
        {
            Etat etatValue;

            CreateMap<ActifCreateDto, Actif>().ReverseMap();
            CreateMap<ActifUpdateDto, Actif>()
                .ForMember(dest => dest.Etat, opt => opt.MapFrom(src =>
                     Enum.TryParse(src.Etat.ToString(), out etatValue) ? etatValue : Etat.EnCommande))
                .ForMember(dest => dest.EmplacementId, opt => opt.MapFrom(src => src.EmplacementId))
                .ForMember(dest => dest.FournisseurId, opt => opt.MapFrom(src => src.FournisseurId))
                .ForMember(dest => dest.AssignedToId, opt => opt.MapFrom(src => src.AssignedToId))
                .ForMember(dest => dest.ManagedById, opt => opt.MapFrom(src => src.ManagedById))
                .ForMember(dest => dest.OwnedById, opt => opt.MapFrom(src => src.OwnedById))
                .ReverseMap();

            CreateMap<ActifViewDto, Actif>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.Updater, opt => opt.MapFrom(src => src.Updater))
                .ReverseMap();
        }

        private void CreateMappingsForEmplacements()
        {
            CreateMap<Emplacement, EmplacementCreateDto>().ReverseMap();
            CreateMap<Emplacement, EmplacementUpdateDto>().ReverseMap();
            CreateMap<Emplacement, EmplacementViewDto>()
                .ForMember(dest => dest.Creator, opt => opt.MapFrom(src => src.Creator))
                .ForMember(dest => dest.Updater, opt => opt.MapFrom(src => src.Updater))
                .ReverseMap();

        }

        private void CreateMappingsForEmployes()
        {
            CreateMap<Employe, EmployeCreateDto>().ReverseMap();
            CreateMap<Employe, EmployeUpdateDto>().ReverseMap();
            CreateMap<Employe, EmployeViewDto>()
                .ForMember(dest => dest.Creator, opt => opt.MapFrom(src => src.Creator))
                .ForMember(dest => dest.Updater, opt => opt.MapFrom(src => src.Updater))
                .ReverseMap();
        }

        private void CreateMappingsForProduits()
        {
            CreateMap<Produit, ProduitCreateDto>().ReverseMap();
            CreateMap<Produit, ProduitUpdateDto>().ReverseMap();
            CreateMap<Produit, ProduitViewDto>()
                .ForMember(dest => dest.Creator, opt => opt.MapFrom(src => src.Creator))
                .ForMember(dest => dest.Updater, opt => opt.MapFrom(src => src.Updater))
                .ReverseMap();
        }

        private void CreateMappingsForFournisseurs()
        {
            CreateMap<Fournisseur, FournisseurCreateDto>().ReverseMap();
            CreateMap<Fournisseur, FournisseurUpdateDto>().ReverseMap();
            CreateMap<Fournisseur, FournisseurViewDto>()
                .ForMember(dest => dest.Creator, opt => opt.MapFrom(src => src.Creator))
                .ForMember(dest => dest.Updater, opt => opt.MapFrom(src => src.Updater))
                .ReverseMap();
        }

        private void CreateMappingsForUsers()
        {
            CreateMap<User, UserViewDto>()
                .ForMember(u => u.Roles, li => li.MapFrom(u => u.UserRoles))
                .ReverseMap();

            CreateMap<UserRole, RoleViewDto>()
                .ForMember(rv => rv.Name, li => li.MapFrom(ur => ur.Role.Name))
                .ForMember(rv => rv.Id, li => li.MapFrom(ur => ur.RoleId))
                .ReverseMap();

            CreateMap<User, UserCreateDto>()
                .ForMember(u => u.Email, li => { li.MapFrom(u => u.UserName); })
                .ReverseMap();

            CreateMap<User, UserUpdateDto>()
                .ForMember(u => u.Email, li => { li.MapFrom(u => u.UserName); })
                .ReverseMap();
        }

        private void CreateMappingsForRoles()
        {
            CreateMap<Role, RoleViewDto>().ReverseMap();
            CreateMap<Role, RoleCreateDto>().ReverseMap();
            CreateMap<Role, RoleUpdateDto>().ReverseMap();
        }
    }
}

