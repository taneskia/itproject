﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Models;

namespace server.Migrations
{
    [DbContext(typeof(ItprojectContext))]
    partial class ItprojectContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("server.Entities.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("AcceptTerms")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<DateTime?>("PasswordReset")
                        .HasColumnType("datetime");

                    b.Property<string>("ResetToken")
                        .HasColumnType("text");

                    b.Property<DateTime?>("ResetTokenExpires")
                        .HasColumnType("datetime");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("datetime");

                    b.Property<string>("VerificationToken")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Verified")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("server.Models.Order", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<int>("State")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("server.Models.Product", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ImageURL")
                        .HasColumnType("text");

                    b.Property<int?>("MarketID")
                        .HasColumnType("int");

                    b.Property<int>("Market_ID")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<float>("Price")
                        .HasColumnType("float");

                    b.HasKey("ID");

                    b.HasIndex("MarketID");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("server.Models.ProductOrder", b =>
                {
                    b.Property<int>("ProductID")
                        .HasColumnType("int");

                    b.Property<int>("OrderID")
                        .HasColumnType("int");

                    b.HasKey("ProductID", "OrderID");

                    b.HasIndex("OrderID");

                    b.ToTable("ProductOrders");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("Discriminator").HasValue("User");
                });

            modelBuilder.Entity("server.Models.Market", b =>
                {
                    b.HasBaseType("server.Models.User");

                    b.HasDiscriminator().HasValue("Market");
                });

            modelBuilder.Entity("server.Entities.Account", b =>
                {
                    b.OwnsMany("server.Entities.RefreshToken", "RefreshTokens", b1 =>
                        {
                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int");

                            b1.Property<int>("AccountId")
                                .HasColumnType("int");

                            b1.Property<DateTime>("Created")
                                .HasColumnType("datetime");

                            b1.Property<string>("CreatedByIp")
                                .HasColumnType("text");

                            b1.Property<DateTime>("Expires")
                                .HasColumnType("datetime");

                            b1.Property<string>("ReplacedByToken")
                                .HasColumnType("text");

                            b1.Property<DateTime?>("Revoked")
                                .HasColumnType("datetime");

                            b1.Property<string>("RevokedByIp")
                                .HasColumnType("text");

                            b1.Property<string>("Token")
                                .HasColumnType("text");

                            b1.HasKey("Id");

                            b1.HasIndex("AccountId");

                            b1.ToTable("RefreshToken");

                            b1.WithOwner("Account")
                                .HasForeignKey("AccountId");
                        });
                });

            modelBuilder.Entity("server.Models.Product", b =>
                {
                    b.HasOne("server.Models.Market", null)
                        .WithMany("Products")
                        .HasForeignKey("MarketID");
                });

            modelBuilder.Entity("server.Models.ProductOrder", b =>
                {
                    b.HasOne("server.Models.Order", "Order")
                        .WithMany("ProductOrder")
                        .HasForeignKey("OrderID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Product", "Product")
                        .WithMany("ProductOrder")
                        .HasForeignKey("ProductID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
