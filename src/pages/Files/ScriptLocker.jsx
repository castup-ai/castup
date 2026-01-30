import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import TopHeader from '../../components/TopHeader';
import { useData } from '../../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Upload, File, Share2, Download } from 'lucide-react';

export default function ScriptLocker() {
    const { files, addFile } = useData();
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploading(true);
            setTimeout(() => {
                addFile({
                    id: Date.now().toString(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    uploadedAt: new Date().toISOString(),
                });
                setUploading(false);
            }, 1500);
        }
    };

    return (
        <DashboardLayout>
            <TopHeader title="Script Locker" />
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Upload Section */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-xl">Upload Files</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#FF7A5A] transition-colors">
                                <Upload className="w-12 h-12 text-[#6B6B6B] mx-auto mb-4" />
                                <p className="text-[#6B6B6B] mb-4">Drag and drop files here or click to browse</p>
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="file-upload"
                                    disabled={uploading}
                                />
                                <label htmlFor="file-upload">
                                    <Button asChild disabled={uploading}>
                                        <span>{uploading ? 'Uploading...' : 'Choose File'}</span>
                                    </Button>
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Files List */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Your Files</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {files && files.length > 0 ? (
                                <div className="space-y-3">
                                    {files.map((file) => (
                                        <div
                                            key={file.id}
                                            className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-xl hover:bg-[#FFE5DD] transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-[#FF7A5A] flex items-center justify-center">
                                                    <File className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#3C3C3C]">{file.name}</p>
                                                    <p className="text-sm text-[#6B6B6B]">
                                                        {(file.size / 1024).toFixed(2)} KB • {new Date(file.uploadedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Share2 className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <File className="w-16 h-16 text-[#6B6B6B] mx-auto mb-4" />
                                    <p className="text-[#6B6B6B]">No files uploaded yet</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </DashboardLayout>
    );
}
